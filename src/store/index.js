import Vue from "vue";
import Vuex from "vuex"

// 安装插件
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      console.log(state.cartList)
      // console.log(payload)
      // let oldProduct = null;
      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        oldProduct.count += 1
        console.log(oldProduct.count)
      } else {
        payload.count = 1
        state.cartList.push(payload)
      }

    }
  }
})

export default store
