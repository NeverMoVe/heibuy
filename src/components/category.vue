<template>
<div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                               <el-input-number v-model="buynum" :min="1" :max="goodsinfo.stock_quantity" ></el-input-number> 
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click='add2Cart' class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" class="selected">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" style="display: block;" v-html="goodsinfo.content">
                                
                            </div>
                            <div class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="it in discusslist">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{it.user_name}}</span>
                                                    <span>{{it.add_time|filtertime('YYYY-MM-DD HH:mm:ss')}}</span>
                                                </div>
                                                <p>{{it.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <span class="disabled" @click='this.pageIndex==1?this.pageIndex:this.pageIndex--'>« 上一页</span>
                                            <span class="current">{{this.pageIndex}}</span>
                                            <span class="disabled" @click='this.pageIndex==this.totalcount?this.pageIndex==this.totalcount:this.pageIndex++'>下一页 »</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for='item in hotgoodslist'>
                                        <router-link :to="`/category/${item.id}`">
                                        <div class="img-box">
                                                <img :src="item.img_url">
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            {{item.title}}
                                            <!-- </a> -->
                                            <span>{{item.add_time | filtertime('YYYY-MM-DD')}}</span>
                                        </div>
                                        </router-link>
                                    </li>
                                
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            goodsinfo:{},
            hotgoodslist:[],
            imglist:[],
            buynum:1,
            discusslist:[],
            pageIndex:1,
            pageSize:10,
            totalcount:''
        }
    },
    watch: {
        $route(newValue,oldValue){
            window.scrollTo(0,0)
             this.getDtata(newValue.params.id)
        },
        // pageIndex(newvalue,oldvalue){
        //     console.log(newvalue);
        // }
    },
    methods:{
        // 添加购物车
        add2Cart(){
            this.$store.commit('add2Cart',{
                goodsId:this.goodsinfo.id,
                goodsNum:this.buynum,
            })
        },
        getDtata(id){
            this.$http.get(`site/goods/getgoodsinfo/${id}`).then(success=>{  
          this.goodsinfo=success.data.message.goodsinfo
          this.hotgoodslist=success.data.message.hotgoodslist
          this.imglist=success.data.message.imglist
        })
        }
    },
    created() {
        this.getDtata(this.$route.params.id)
        this.$http.get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(success=>{
            // console.log(success);
            this.discusslist=success.data.message
            this.totalcount=success.data.totalcount
            // this.pageIndex=success.data.pageIndex
            this.pageSize=success.data.pageSize
            // console.log(this.pageIndex);
            
        })
    },
    
}
</script>
<style>
.tab-content img{
    /* display: block; */
    vertical-align: middle
}
</style>

