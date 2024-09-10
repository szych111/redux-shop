import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment } from 'react';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/Layout/Notification';
import { sendCart, fetchCart } from './store/cart-actions';

let isInitial = true

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.showCart)
  const cart = useSelector(state => state.cart.cart)
  const notification = useSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    dispatch(sendCart(cart))
    
  }, [cart, dispatch])
  
  return (
    <Fragment>
      {notification && (
        <Notification 
        status={notification.status} 
        title={notification.title} 
        message={notification.message} 
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
