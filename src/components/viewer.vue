<template>
  <div id="index">
    <ul>
      <li v-for="(item,index) of imgArr"><img :src="item" alt="图片描述"  :data-original="img"></li>
    </ul>
  </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        imgArr:[
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3472263623,506218584&fm=26&gp=0.jpg',
          'http://www.sinaimg.cn/dy/slidenews/21_img/2015_17/2236_4146071_705561.jpg',
          'http://www.sinaimg.cn/dy/slidenews/21_img/2015_17/2236_4146072_346494.jpg'
        ],
        img:"http://demo.sc.chinaz.com/Files/DownLoad/webjs1/201801/jiaoben5647/img/5.jpg"
      }
    },
    mounted(){
      const ViewerDom = document.getElementById('index');
      const viewer = new Viewer(ViewerDom, {
        // 相关配置项,详情见下面
        url: "data-original"
      });
    }
  }
</script>

<style>
  *{
    padding:0;
    margin: 0;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
  ul li{
    width:265px;
    height: 180px;
    list-style: none;
    border:2px solid #CCC;
    border-radius: 3px;
    padding: 1px;
    margin: 10px;
    cursor: pointer;
  }
  ul li img{
    width:100%;
    height: 100%;
  }
</style>
