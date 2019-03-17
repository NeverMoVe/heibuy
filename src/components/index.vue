<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="it in catelist">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{it.title}}</span>
                    <p>
                      <span v-for="value in it.subcates">{{value.title}}&nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">手机数码</a>
                      </dt>
                      <dd>
                        <a href="/goods/43.html">手机通讯</a>
                        <a href="/goods/43.html">摄影摄像</a>
                        <a href="/goods/43.html">存储设备</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="banner-img">
              <el-carousel height="341px">
                <el-carousel-item v-for="item in sliderlist" :key="item.id">
                  <router-link :to="`/category/${item.id}`">
                  <img :src="item.img_url" alt="">
                  </router-link>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="(item,index) in toplist" :key="item.id">
                <router-link :to="`/category/${item.id}`">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url">
                </div>
                <div class="txt-box">
                  <a href="/goods/show-98.html">{{item.title}}</a>
                  <span>{{item.add_time|filtertime}}</span>
                </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-for="(item,index) in shoplist">
      <div class="main-tit">
        <h2>{{item.catetitle}}</h2>
        <p>
          <a href="/goods/43.html" v-for="it in item.level2catelist">{{it.subcatetitle}}</a>
          <a href="/goods/40.html">
            更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="it in item.datas">
              <!-- <a href="#/site/goodsinfo/87" class> -->
              <router-link :to="'/category/'+it.artID">
                <div class="img-box">
                  <img :src="it.img_url">
                </div>
                <div class="info">
                  <h3>{{it.artTitle}}</h3>
                  <p class="price">
                    <b>{{it.sell_price}}</b>元
                  </p>
                  <p>
                    <strong>库存 {{it.stock_quantity}}</strong>
                    <span>
                      市场价：
                      <s>{{it.market_price}}</s>
                    </span>
                  </p>
                </div>
                <!-- </a> -->
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // Vue加载完毕时候触发
  data() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      shoplist: []
    };
  },
  created() {
    this.$http.get("site/goods/gettopdata/goods").then(success => {
      this.catelist = success.data.message.catelist;
      this.sliderlist = success.data.message.sliderlist;
      this.toplist = success.data.message.toplist;
    }),
      this.$http.get("site/goods/getgoodsgroup").then(success => {
        this.shoplist = success.data.message;
        console.log(this.shoplist);
      });
  }
  // filters:{
  //   filtertime(value){
  //     value=value.toSring()
  //    return value.substring(value.indexOf('T'))
  //   }
  // }
};
</script>
<style>
.el-carousel__item img{
  /* width: 100%; */
  height: 100%;
  /* display: block; */
}
</style>

