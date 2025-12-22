// function RootReducer(state=initialState,action){
//     switch(action.type){
//         case "ADD_CART":
//             state.cart[action.payload[0]]=action.payload[1]
//             console.log("cart item .. ",state.cart)
//             return {cart:state.cart}
//         case "DELETE_CART":
//             delete state.cart[action.payload[0]]
//             console.log("cart item .. ",state.cart)
//             return {cart:state.cart}
//         default:
//             return {cart:state.cart}
//     }
// }
// export default RootReducer;

const initialState = {
  cart: {},
};

function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_CART": 
        return {
          ...state, // spread existing state (creates a new object)
          cart: {
            ...state.cart, // spread existing cart (creates a new cart object)
            [action.payload[0]]: action.payload[1], // add new item
          },
        };

    //   wrong approach:
    //  state.cart[action.payload[0]]=action.payload[1] //This mutates the original state, which violates the principle of immutability in Redux.
    //  console.log("cart item .. ",state.cart)
    //  return {cart:state.cart} //Since you are not creating a new object, React may not re-render the UI because it relies on shallow comparison to detect changes.

    case "UPDATE_CART":
      const [productid,productData]=action.payload;
      if(productData.quantity<1){
        const updatedCart = { ...state.cart };
        delete updatedCart[productid]; 
        return{
          ...state,
          cart:updatedCart
        }
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          [productid]: productData,
        },
      };

    case "DELETE_CART": 
      const updatedCart = { ...state.cart };
      delete updatedCart[action.payload[0]]; // Properly delete item
      return { ...state, cart: updatedCart };

    case "EMPTY_CART": 
      return { ...state, cart: {} };
      // cart: {} doesn't "empty" the old object—it creates a new one and assigns it to cart, effectively replacing it.

    default:
      return state;
  }
}

export default RootReducer;
