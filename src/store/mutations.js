import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutations-types"

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += payload.num
  },
  [ADD_TO_CART](state, payload) {
    payload.count = payload.num
    payload.check = true
    state.cartList.push(payload)
  }
}
