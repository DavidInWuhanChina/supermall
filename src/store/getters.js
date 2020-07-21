export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state){
    return state.cartList
  },
  totalPrice(state){
    return '￥' + state.cartList.filter(item => {
      return item.checked
    }).reduce((preValue, item)=>{
      return preValue + item.price * item.count
    },0).toFixed(2);
  },
  checkLength(state){
    //获取选中商品信息的数量
    return state.cartList.filter(item => item.checked).length
  },
  isSelectAll(state){
    // return  !(state.cartList.filter(item => !item.checked).length)

    if (state.cartList.length === 0) return false
    return !state.cartList.find(item =>!item.checked);


    // let isCheck = false;
    // for(let item of state.cartList){
    //   if(!item.checked){
    //     isCheck = false
    //     return isCheck
    //   }
    // }
    // return true
  }

}
