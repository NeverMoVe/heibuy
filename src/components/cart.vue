<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <router-link to="/index">首页</router-link>&gt;
        <a href="/cart.html">购物车</a>
      </div>
    </div>

    <div class="section">
      <div class="wrapper">
        <div class="bg-wrap">
          <!--购物车头部-->
          <div class="cart-head clearfix">
            <h2>
              <i class="iconfont icon-cart"></i>我的购物车
            </h2>
            <div class="cart-setp">
              <ul>
                <li class="first active">
                  <div class="progress">
                    <span>1</span>
                    放进购物车
                  </div>
                </li>
                <li>
                  <div class="progress">
                    <span>2</span>
                    填写订单信息
                  </div>
                </li>
                <li class="last">
                  <div class="progress">
                    <span>3</span>
                    支付/确认订单
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--购物车头部-->
          <!--商品列表-->
          <div class="cart-box">
            <input id="jsondata" name="jsondata" type="hidden">
            <table
              width="100%"
              align="center"
              class="cart-table"
              border="0"
              cellspacing="0"
              cellpadding="8"
            >
              <tbody>
                <tr>
                  <th width="48" align="center">
                    <a>选择</a>
                  </th>
                  <th align="left" colspan="2">商品信息</th>
                  <th width="84" align="left">单价</th>
                  <th width="104" align="center">数量</th>
                  <th width="104" align="left">金额(元)</th>
                  <th width="54" align="center">操作</th>
                </tr>
                <tr v-if="cartList.length>0" v-for="(it,index) in cartList">
                  <!-- 选择框 -->
                  <td width="48" align="center">
                    <input type="checkbox" v-model="it.isChecked">
                  </td>
                  <td class="imgrow" align="left" colspan="2">
                    <img :src="it.img_url" alt class="cartimg">
                    {{it.title}}
                  </td>

                  <td width="84" align="left">{{it.sell_price}}</td>
                  <td width="104" align="center">
                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                      <div class="stock-box">
                        <el-input-number v-model="it.buycount" :min="1" :max="10"></el-input-number>
                      </div>
                    </div>
                  </td>
                  <td width="104" align="left">{{it.sell_price*it.buycount}}</td>

                  <td width="54" align="center">
                    <el-button type="danger" @click="delOne(index)">删除</el-button>
                  </td>
                </tr>
                <tr v-else>
                  <td colspan="10">
                    <div class="msg-tips">
                      <div class="icon warning">
                        <i class="iconfont icon-tip"></i>
                      </div>
                      <div class="info">
                        <strong>购物车没有商品！</strong>
                        <p>
                          您的购物车为空，
                          <a href="/index.html">马上去购物</a>吧！
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <input type="checkbox" width="48" align="center" v-model="checkAll">
                  <th align="right" colspan="8">
                    已选择商品
                    <b class="red" id="totalQuantity">0</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                    <span class="red">￥</span>
                    <b class="red" id="totalAmount">0</b>元
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <!--/商品列表-->
          <!--购物车底部-->
          <div class="cart-foot clearfix">
            <div class="right-box">
              <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
              <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
            </div>
          </div>
          <!--购物车底部-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartList: []
    };
  },
  methods: {
    // 删除功能
    delOne(index) {
      this.cartList.splice(index, 1);
    }
  },
  async created() {
    //   初始化
    var ids = "";
    for (var key in this.$store.state.goodsData) {
      ids += key + ",";
    }
    ids = ids.substring(0, ids.length - 1);
    let res = await this.$http.get(`site/comment/getshopcargoods/${ids}`);

    res.data.message.forEach(v => {
      v.buycount = this.$store.state.goodsData[v.id];
      v.isChecked = true
    });
    this.cartList = res.data.message;
  },
  //   侦听器
  watch: {
    cartList: {
      handler: function(val, oldVal) {
        let sendData = {};
        val.forEach(element => {
          console.log(element);
          sendData[element.id] = element.buycount;
        });
        this.$store.commit("updataData", sendData);
      },
      deep: true
    }
  },
  //   计算属性
  computed: {
    checkAll: {
      get() {
       let newArr = this.cartList.filter(v => {
          //   v.isChecked==true
          return v.isChecked;
        });
        return newArr.length == this.cartList.length;
      },
      set(value) {
        this.cartList.forEach(v => {
          v.isChecked = value;
        });
      }
    }
  }
};
</script>

<style>
.imgrow {
  text-align: left;
}
.cartimg {
  width: 50px;
  height: 50px;
}
tbody {
  text-align: center;
}
</style>
