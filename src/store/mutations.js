import {ADD_COUNTER, ADD_TO_CART, CHECK_CLICK, DELETE_INFO,REDUCE_COUNTER} from "./mutations-types";

export default {
  //mutation唯一的目的是修改state中的状态
  // mutations中的每个方法尽可能完成的事情比较单一一点
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.checked = true
    state.cartList.push(payload)
  },
  [CHECK_CLICK](state,payload){
    payload.checked = !payload.checked
  },
  [DELETE_INFO](state){
  // 定义一个新的cartList
  let newCartList = []
  //  将未选中的商品信息重新存放在newCartList
    state.cartList.map(item =>{
      if(item.checked){
        return
      }
      newCartList.push(item)
    })
  //  修改cartList的新指向
    state.cartList = newCartList
  },
  [REDUCE_COUNTER](state,payload){
    if (payload.count > 1){
      payload.count--
    }
  }
}
