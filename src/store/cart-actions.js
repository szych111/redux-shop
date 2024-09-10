import { uiActions } from "./ui-slice";
import { cartActions } from "./cart";

export const fetchCart = cartData => {
    return async dispatch => {
        const fetchRequest = async () => {
            const response = await fetch('https://redux-shopping-31ada-default-rtdb.europe-west1.firebasedatabase.app/cart.json', )
        
            if (!response.ok) {
              throw new Error('Fetching cart failed.')
            }

            const data = await response.json()
            
            return data
        }
    
        try {
            const cartData = await fetchRequest()
            dispatch(cartActions.replaceCart(cartData))
          } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart failed.'
            }))
          }   
    }
}


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
            throw new Error('Sending cart failed.')
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