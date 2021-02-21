import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types"

export default {
  addCart(context, payload) {
    // console.log(context.state.cartList)
    // console.log(payload)
    // let oldProduct = null;
    // for (let item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // console.log(context)
    return new Promise((resolve, reject)=> {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // console.log(oldProduct)
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品+1')
      } else {
        context.commit(ADD_TO_CART, payload, oldProduct);
        resolve('添加了新的商品')
      }
    })
  }
}
