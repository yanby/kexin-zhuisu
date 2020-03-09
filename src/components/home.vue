<template>
    <div class="home">
      <div class="nav" @click="goGuide">{{farm.name}}</div>
      <div class="banner">
        <div class="banner-list">
          <mt-swipe >
            <mt-swipe-item v-for="item in banners"><img :src="item.file" alt=""></mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="banner-txt" v-if="banners.length != 0">滑动查看更多</div>
      </div>
      <div class="address">
        <div class="address-list">
          <div class="title">
            <h3>我的农场在{{farm.province}}</h3>
            <p>卫星视角拍摄我的农场影像</p>
          </div>
          <div class="img"><img :src="moon" alt=""></div>
          <div class="map" @click="mapFun" v-if="farm.x && farm.y">
            <div id="container"></div>
          </div>
        </div>
      </div>
      <div class="record">
        <div class="title">
          <h3>我坚持诚信种植</h3>
          <p v-if="batchInfoTakes.length != 0">成长的每一步都能看得见，让您吃得安心</p>
          <p v-if="batchInfoTakes.length == 0">恪守“三不使用”底线，遵循作物自然生长规律</p>
          <p v-if="batchInfoTakes.length == 0">让您吃的安心</p>
          <div class="img1"></div>
          <div class="img2" v-if="batchInfoTakes.length != 0"></div>
        </div>
        <div class="msg" v-if="batchInfoTakes.length != 0">
          <div class="four-msg-list" v-if="item.workName != '采收'" v-for="item in batchInfoTakes">
            <div class="four-msg-time">
              <div class="four-msg-year">{{item.year}}</div>
              <div class="four-msg-mounth">{{item.moonDay}}</div>
            </div>
            <div class="four-msg-yuan"></div>
            <div class="four-msg-line"></div>
            <div class="four-msg-msg">
              <div class="four-msg-txt">{{item.workName}}</div>
              <div class="four-msg-img" >
                <viewer :images="item.arr">
                  <img v-for="(item1,index1) in item.arr" :data-source="item.imgs[index1]" :src="item1">
                </viewer>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom"></div>
      </div>
      <div class="report" v-if="result1.length != 0">
        <div class="title">我的农场经过严格的检测悉心呵护作物的健康成长</div>
        <div class="report-list">
          <div class="list" v-for="item in result1" @click="pdfFun(item)">
            <div class="txt">{{item.fileName}}</div>
            <div class="img"></div>
            <div class="date">{{item.fileTime}}</div>
          </div>
        </div>
        <div class="more" @click="reportMore"  v-if="result1.length >= 3"></div>
      </div>
      <div class="other"  v-if="result2.length != 0">
        <div class="title"><p>为了作物的健康成长</p> <p>我还做了更多...</p></div>
        <div class="report-list">
          <div class="list" v-for="item in result2" @click="pdfFun(item)">
            <div class="img"><span>{{item.fileName}}</span></div>
            <div class="date">{{item.fileTime}}</div>
          </div>
        </div>
        <div class="more" @click="otherMore" v-if="result2.length >= 3"></div>
      </div>
      <div class="welcome">
        <div class="welcome-list">
          <h3>欢迎到我的农场参观~</h3>
          <p>种植信息服务商：<span>可信农场</span></p>
        </div>
      </div>
      <div class="code">
        <div class="code-list">
          <p>关注可信农场微信公众号与我们一起关心食品安全</p>
          <div class="img"><img src="../../static/images/code.png" alt=""></div>
        </div>
      </div>
    </div>

</template>

<script type="text/ecmascript-6">
  import { Toast, Swipe, SwipeItem } from 'mint-ui';
  export default {
    name: '',
    data () {
      return {
        id: "",
        flag1: true,
        flag2: true,
        banners: [],
        objs: "",
        farm: "",
        moon: "",
        page1: 1,//第几页
        page2: 1,//第几页
        limit1: 3,//几条
        limit2: 3,//几条
        result1: "",
        result2: "",
        nextPage1: "",
        batchInfoTakes:""
      }
    },
    components: {

    },
    mounted(){

      this.id = this.$route.query.id;
      this.init();


      this.$nextTick(function () {
        window.addEventListener('scroll', this.onScroll)
      })
    },
    methods: {
      onScroll(){
        var scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        if(scrollTop >= 500){
          if(this.flag1){
            this.history();
            this.flag1 = false
          }
        }
        if(scrollTop >= 1000){
          if(this.flag2){
            this.report();
            this.other();
            this.flag2 = false
          }
        }
      },
      init(){
        var that = this;
        this.$http({
          url: '/index/getIndex',
          method: 'post',
          params: {
            vid:  this.id
          }
        }).then(res => {
          console.log(res);
          if(res.code == 1){
            this.objs = res.objs;
            this.farm = res.objs.farm;
            this.moon = res.objs.moon.file;
            this.banners = res.objs.banners;
            if(this.farm.x && this.farm.y){
              setTimeout(function(){
                that.map()
              },500)
            }
          }
        })
      },
      //生产记录
      history(){
        var that = this;
        this.$http({
          url: '/index/getWorks',
          method: 'post',
          params: {
            vid:  this.id
          }
        }).then(res => {
          console.log(res);
          if(res.code == 1){
            this.batchInfoTakes = res.objs.batchInfoTakes;
            //重点：要在图片已经请求到再调用！！
            if(this.batchInfoTakes){
              that.batchInfoTakes.forEach((item,index)=>{
                item.imgs.forEach((item1,index1)=>{
                  item.arr.push(item1 + "?x-oss-process=image/auto-orient,1/quality,q_1");
                })
              })
            }
          }
        })
      },
      //检测报名
      report(){
        var that = this;
        this.$http({
          url: '/index/getTest',
          method: 'post',
          params: {
            vid:  this.id,
            page: this.page1,
            limit: this.limit1
          }
        }).then(res => {
          console.log(res);
          if(res.code == 1){
            this.result1 = res.objs.result.list;
            console.log(this.result1.length)
            this.nextPage1 = res.objs.result.nextPage;
          }
        })
      },
      //检测报告加载更多
      reportMore(){
        var that = this;
        if(this.nextPage1 == 0){
          Toast('暂无更多数据了')
        }else{
          this.page1++;
          this.$http({
            url: '/index/getTest',
            method: 'post',
            params: {
              vid:  this.id,
              page: this.page1,
              limit: this.limit1
            }
          }).then(res => {
            console.log(res);
            if(res.code == 1){
              this.result1 = this.result1.concat(res.objs.result.list);
              this.nextPage1 = res.objs.result.nextPage;
            }
          })
        }
      },
      //其他
      other(){
        var that = this;
        this.$http({
          url: '/index/getRecord',
          method: 'post',
          params: {
            vid:  this.id,
            page: this.page2,
            limit: this.limit2
          }
        }).then(res => {
          console.log(res);
          if(res.code == 1){
            this.result2 = res.objs.result.list;
            console.log(this.result2.length)
            this.nextPage2 = res.objs.result.nextPage;
          }
        })
      },
      //其他加载更多
      otherMore(){
        var that = this;
        if(this.nextPage2 == 0){
          Toast('暂无更多数据了')
        }else{
          this.page2++;
          this.$http({
            url: '/index/getRecord',
            method: 'post',
            params: {
              vid:  this.id,
              page: this.page2,
              limit: this.limit2
            }
          }).then(res => {
            console.log(res);
            if(res.code == 1){
              this.result2 = this.result2.concat(res.objs.result.list);
              this.nextPage2 = res.objs.result.nextPage;
            }
          })
        }
      },
      //地图加载
      map(){
         var x = this.farm.x;
         var y = this.farm.y;
         var map = new AMap.Map("container", {
           zoom: 13,
           center: [y, x],
           layers: [new AMap.TileLayer.Satellite()],
             resizeEnable: true,
             zoomEnable:false,
             dragEnable: false
         });

        var icon = new AMap.Icon({
          size: new AMap.Size(10, 10),    // 图标尺寸
        });
         // 创建点覆盖物
         var marker = new AMap.Marker({
           position: map.getCenter(),
           icon: new AMap.Icon({
             image: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
             size: new AMap.Size(12, 20),  //图标大小
             imageSize: new AMap.Size(12,20)
           }),
           offset: new AMap.Pixel(0, 20),
         });
         marker.setMap(map);
         marker.setLabel({
           offset: new AMap.Pixel(0, 0),  //设置文本标注偏移量
             content: "<div class='two-info' style='padding:.2rem;width: 2.8rem;height: 0.8rem;position: relative;'><span style='display:inline-block;position: absolute;right: .2rem;" +
             "bottom: .1rem;width: .32rem;height: .32rem;background: url(../../static/images/daohang.png);-webkit-background-size: 100% 100%;background-size: 100% 100%;'></span><p style='height:.4rem;line-height: .4rem;font-size: .28rem;color: #45C672;border-bottom: .01rem solid #ccc;padding-bottom: .1rem;width: 2.8rem; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>"+this.farm.name +"</p><p style='font-size: .24rem;color: #9EA5B5;padding-top: .1rem;width: 2.8rem; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;'>"+this.farm.path +"</p></div>", //设置文本标注内容
           direction: 'top' //设置文本标注方位d
         });
      },
      //点击地图
      mapFun(){
        console.log(this.farm.y)
        console.log(this.farm.x)
        window.open("http://api.map.baidu.com/marker?location="+this.farm.x+","+this.farm.y+"&title="+this.farm.name+"&content="+this.farm.path+"&output=html&src=可信农场");//        window.open("https://m.amap.com/navi/?start="+this.farm.y+","+this.farm.x+"&dest="+this.farm.y+","+this.farm.x+"&destName=导航&key=f32959b10061612ec7857c9240656e9a")
      },
      //返回上一页
      goGuide(){
        this.$router.go(-1);
      },
      //pdf加载
      pdfFun(item){
        window.open('/static/pdf/web/viewer.html?file='+item.file+'');
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import "../../static/css/home.less";
</style>
<style>
  .amap-marker-label {
    border: none!important;
    border-radius: .1rem;
  }


  .banner-list /deep/ .mint-swipe-indicator.is-active{
    background: #45c672;opacity: 0.9;
  }

</style>
