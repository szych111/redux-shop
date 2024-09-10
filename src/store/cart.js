import { createSlice } from "@reduxjs/toolkit";

import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {cart: []},
    reducers: {
        replaceCart(state, action) {state.cart = action.payload},
        addItem(state, action) {
            const itemIndex = state.cart.findIndex(cartItem => cartItem.title === action.payload.title)

            if (itemIndex < 0) {
                state.cart = [{
                    title: action.payload.title, 
                    price: action.payload.price,
                    quantity: 1,
                }, ...state.cart]
            } else {
                state.cart[itemIndex].quantity++
            }
            
        },
        removeItem(state, action) {
            const item = state.cart.find(cartItem => cartItem.title === action.payload.title)

            if (item.quantity > 1) {
                item.quantity--
            } else {
                state.cart = state.cart.filter(i => i.title !== item.title)
            }
        },
        toggle(state) {state.showCart = !state.showCart}
    }
})

export const sendCart = (cartData) => {
    return async dispatch => {
       dispatch(uiActions.showNotification({
        status: 'pending',
        title: 'Sending!',
        message: 'Sending cart data.'
      }))

      const sendRequest = async () => {
        const response = await fetch('https://redux-shopping-31ada-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
            method: 'PUT',
            body: JSON.stringify(cartData)
          })
    
          if (!response.ok) {
            throw new Error('Sending card failed.')
          }
      }

      try {
        await sendRequest()

        dispatch(uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Cart sent.'
          }))
      } catch (error) {
        dispatch(uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart failed.'
        }))
      }
    }
}

export default cartSlice.reducer;

export const cartActions = cartSlice.actions
