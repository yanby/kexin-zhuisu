<template>
    <div class="guide">
      <div class="top">
        <!--<div class="top-bg"></div>-->
        <div class="top-txt"> {{objs.chatTitle}} <b>正在输入 <span></span></b></div>
      </div>
      <div class="content">
        <div class="list" v-for="(item,index) in chats">
          <div class="img"><img :src="represent" alt=""></div>
          <div class="txt">{{item.text}}</div>
        </div>
        <div class="list list1">
          <div class="img"><img :src="represent" alt=""></div>
          <div class="txt" @click="goHome">
            <div class="txt-img"><img :src="banner" alt=""></div>
            <div class="txt-btn">进入我的农场看看吧>></div>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: '',
        data () {
          return {
            index: 1,
            total: "",
            objs: "",
            chats: [],
            represent: "",
            banner: ""
          }
        },
        mounted(){
          var that = this;
          $(".content .list1").hide()
          setTimeout(()=>{
            $(".top-txt b").show();
          },800)
          $(".content").height($(window).height())
          this.id = this.$route.query.id;
          if(this.id == "None"){  //跨年bug12.31-1.2
            this.id = 1162
          }
          this.init()
        },
        methods:{
          init(){
            var that = this;
            this.$http({
              url: '/index/getChat',
              method: 'post',
              params: {
                vid:  this.id
              }
            }).then(res => {
              console.log(res);
              this.objs = res.objs;
              this.chats = res.objs.chats;
              this.represent = res.objs.head + "?x-oss-process=image/auto-orient,1/quality,q_1";

              this.banner = res.objs.banners[res.objs.banners.length - 1].file;

              var time = setInterval(()=>{

                $(".content .list").eq(that.index).show()
                that.index++
                if(that.index >= that.chats.length){
                  clearInterval(time)
                }
              },that.index * 2000)

              setTimeout(()=>{
                $(".content .list1").show()
                $(".top-txt b").hide();
              },(that.chats.length) * 2000)
            })
          },
          goHome(){
            this.$router.push({path:"/home",query:{id:this.id}})
          }
        }
    }
</script>

<style scoped lang="less" type="text/less">
  .guide{
    width: 7.5rem;
    margin: 0 auto;

    .top{
      width: 100%;
      height: .9rem;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      .top-bg{
        width: 7.5rem;
        height: .41rem;
        background: url("../../static/images/guide-top.png") no-repeat;
        -webkit-background-size: 100% 100%;
        background-size:100% 100%;
      }
      .top-txt{

        font-size: .34rem;
        color: #fff;
        height: .9rem;
        line-height: .9rem;
        background: #333333;
        text-indent: .2rem;
        b{
          display: none;
        }
        span{
          display: inline-block;
          width: 0.23rem;
          height: 0.06rem;
          background: url("../../static/images/dian.gif") no-repeat;
          -webkit-background-size: 100% 100%;
          background-size:100% 100%;
        }
      }
    }
    .content{
      margin-top: .9rem;
      height: 11rem;
      background: #ececec;
      padding: .3rem .2rem 3rem;
      .list{
        width: 100%;
        display: none;
        overflow: hidden;
        margin-bottom: .3rem;
        &:nth-of-type(1){
           display: block;
         }
        .img{
          float: left;
          width:.75rem;
          height:.75rem;
          border-radius:.08rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .txt{
          float: left;
          max-width: 5.2rem;
          margin-left: .3rem;
          background: #94eb69;
          font-size:.3rem;
          color: #0F170A;
          padding: .2rem;
          line-height: .4rem;
          border-radius:.08rem;
          position: relative;

        }
        .txt::after{
          position: absolute;
          content: '';
          left: -.2rem;
          top:.3rem;
          width: 0;
          height: 0;
          border-width: .1rem;
          border-style: solid;
          border-color: transparent #94eb69 transparent transparent;
        }
      }
      .list1{
        display: none;
        .txt{
          .txt-img{
            width:3.2rem;
            /*height:5.7rem;*/
            border-radius:.08rem;
            img{
              width: 100%;
              /*height: 100%;*/
            }
          }
          .txt-btn{
            width: 3.2rem;
            margin: .2rem auto 0;
            height: .47rem;
            line-height: .48rem;
            font-size:.24rem;
            color: #fff;
            text-align: center;
            background: #ff875f;
            border-radius: 1rem;
          }
        }
      }
    }
    .bottom{
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
      width: 7.5rem;
      height: 1.02rem;
      background: url("../../static/images/guide-bottom.png") no-repeat #000;
      -webkit-background-size: 100% 100%;
      background-size:100% 100%;
    }
  }
</style>
