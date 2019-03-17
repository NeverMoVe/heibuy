<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
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
                <li class="active">
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
          <div class="cart-box">
            <h2 class="slide-tit">
              <span>1、收货地址</span>
            </h2>
            <el-form
              :model="sendData"
              :rules="rules"
              ref="sendData"
              label-width="100px"
              class="demo-ruleForm"
            >
              <div id="orderForm" name="orderForm" url>
                <div class="form-box address-info my-form">
                  <el-form-item label="发货人姓名" prop="accept_name">
                    <el-input v-model="sendData.accept_name"></el-input>
                  </el-form-item>
                  <dl class="form-group">
                    <!-- 省市联动 -->
                    <el-form-item label="所属地区：" prop="area">
                      <v-distpicker @selected="selected"></v-distpicker>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="详细地址" prop="address">
                      <el-input v-model="sendData.address"></el-input>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="手机号码" prop="mobile">
                      <el-input v-model="sendData.mobile"></el-input>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="联系电话">
                      <el-input v-model="tell" ></el-input>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="电子邮箱" prop="email">
                      <el-input v-model="sendData.email"></el-input>
                    </el-form-item>
                  </dl>
                  <dl class="form-group">
                    <el-form-item label="邮政编码" prop="post_code">
                      <el-input v-model="sendData.post_code"></el-input>
                    </el-form-item>
                  </dl>
                </div>
                <h2 class="slide-tit">
                  <span>2、支付方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio v-model="sendData.payment_id" label="6">在线支付<span>￥0.00</span></el-radio>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>3、配送方式</span>
                </h2>
                <ul class="item-box clearfix">
                  <!--取得一个DataTable-->
                  <li>
                    <el-radio v-model="sendData.express_id" label="1" @click.native="sendData.expressMoment=20">顺丰</el-radio>
                    <el-radio v-model="sendData.express_id" label="2" @click.native="sendData.expressMoment=30">圆通</el-radio>
                    <el-radio v-model="sendData.express_id" label="3"  @click.native="sendData.expressMoment=40">韵达</el-radio>
                  </li>
                </ul>
                <h2 class="slide-tit">
                  <span>4、商品清单</span>
                </h2>
                <div class="line15"></div>
                <table
                  width="100%"
                  border="0"
                  align="center"
                  cellpadding="8"
                  cellspacing="0"
                  class="cart-table"
                >
                  <tbody>
                    <tr>
                      <th colspan="2" align="left">商品信息</th>
                      <th width="84" align="left">单价</th>
                      <th width="84" align="center">购买数量</th>
                      <th width="104" align="left">金额(元)</th>
                    </tr>
                    <tr v-for="it in goodsList">
                      <td width="68">
                        <a target="_blank" href="/goods/show-89.html">
                          <img :src="it.img_url" class="img">
                        </a>
                      </td>
                      <td>
                        <a target="_blank" href="/goods/show-89.html">{{it.title}}</a>
                      </td>
                      <td>
                        <span class="red">{{it.sell_price}}</span>
                      </td>
                      <td align="center">{{it.buycount}}</td>
                      <td>
                        <span class="red">{{it.buycount*it.sell_price}}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="line15"></div>
                <h2 class="slide-tit">
                  <span>5、结算信息</span>
                </h2>
                <div class="buy-foot clearfix">
                  <div class="left-box">
                    <dl>
                      <dt>订单备注(100字符以内)</dt>
                      <dd>
                        <textarea
                          name="message"
                          class="input"
                          style="height:35px;"
                          v-model="sendData.message"
                        ></textarea>
                      </dd>
                    </dl>
                  </div>
                  <div class="right-box">
                    <p>
                      商品
                      <label class="price">{{totalnum}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                      <label
                        id="goodsAmount"
                        class="price"
                      >{{sendData.goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                    </p>
                    <p>
                      运费：￥
                      <label id="expressFee" class="price">0.00</label> 元
                    </p>
                    <p class="txt-box">
                      应付总金额：￥
                      <label id="totalAmount" class="price">2299.00</label>
                    </p>
                    <p class="btn-box">
                      <a class="btn button" href="/cart.html">返回购物车</a>
                      <a id="btnSubmit" class="btn submit" @click="buymoney">确认提交</a>
                    </p>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      if (value != "") {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      } else {
        callback(new Error("手机号不能为空"));
      }
    };
    return {
        tell:'',
      sendData: {
        //   收货人
        accept_name: "",
        //    地区
        area: "",
        //    地址
        address: "",
        //    手机
        mobile: "",
        //    邮箱
        email: "",
        //    邮政编码
        post_code: "",
        //    商品总额***
        goodsAmount: 0,
        // 快递费****
        expressMoment: 0,
        // 支付方式**
        payment_id: '6',
        // 运送方式
        express_id: "",
        // 备注
        message: "",
        // 商品id
        goodsids: "",
        // 商品对象id:num
        cargoodsobj:{}
      },
      totalnum: 0,
      //   商品列表
      goodsList: [],
      //   验证规则
      rules: {
        accept_name: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        area: [{ required: true, message: "地区不能为空", trigger: "blur" }],
        address: [{ required: true, message: "地址不能为空", trigger: "blur" }],
        mobile: [{ required: true, validator: checkMobile, trigger: "blur" }]
      }
    };
  },
  components: { VDistpicker },
  methods: {
    buymoney() {
      console.log(this.goodsList);
      console.log(this.sendData);
    },
    selected(value) {
      this.sendData.area=value
    }
  },
  beforeCreate() {
    window.scrollTo(0, 0);
  },
  async created() {
    let res = await this.$http.get(
      `site/validate/order/getgoodslist/${this.$route.params.id}`
    );
    this.goodsList = res.data.message;
    this.goodsList.forEach(element => {
      // 商品数量
      element.buycount = this.$store.state.goodsData[element.id];
      //   商品总额
      this.sendData.goodsAmount += element.sell_price * element.buycount;
      //   商品数量
      this.totalnum += element.buycount;
            // 商品id
      this.sendData.goodsids+=element.id+','
// 商品对象
      this.sendData.cargoodsobj[element.id]=element.buycount
    });
    // 截取最后一位的逗号
    this.sendData.goodsids=this.sendData.goodsids.substring(0,this.sendData.goodsids.length-1)
    console.log(this.sendData.goodsids);
    console.log(this.goodsList);
  }
};
</script>

<style scoped>
.my-form {
  width: 600px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>
