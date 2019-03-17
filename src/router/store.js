import Vue from 'vue'

import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        goodsData: window.localStorage.getItem('cart') == undefined ? {} : JSON.parse(window.localStorage.getItem('cart')),
        isLogin:false
    },
    mutations: {
        add2Cart(state, goodsInfo) {
            if (state.goodsData[goodsInfo.goodsId]) {

                state.goodsData[goodsInfo.goodsId] += goodsInfo.goodsNum;
            } else {
                // state.goodsData[goodsInfo.goodsId] = goodsInfo.goodsNum

                Vue.set(state.goodsData, goodsInfo.goodsId, goodsInfo.goodsNum);

            }
        },
        updataData(state, sendData) {
            state.goodsData = sendData
        },
        changeLogin(state,isLogin){
            state.isLogin=isLogin
        }
    },
    getters: {
        totalNum(state) {
            let num = 0;
            for (var key in state.goodsData) {
                num += state.goodsData[key]
            }
            return num;
        }
    }
})
window.onbeforeunload = function () {

    window.localStorage.setItem('cart', JSON.stringify(store.state.goodsData));

}
export default store