import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { mainActions } from './store/main-slice';
import StatusBarMessage from './components/UI/StatusBarMessage';
import { getCartData, sendCartDataThunk } from './store/cart-slice';

let isInitialRunning = true;

function App() {
  const isCartVisible = useSelector((state) => state.main.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const statusMessage = useSelector((state) => state.main.statusMessage);
  const dispatch = useDispatch();

  //!!!First - uses Component
  // // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(
  //       mainActions.showStatusMessage({
  //         status: 'pending',
  //         title: 'Sending data...',
  //         message: 'Sending cart data',
  //       })
  //     );
  //     const response = await fetch(
  //       'https://modernreactcustomhooks-default-rtdb.firebaseio.com/cart.json',
  //       {
  //         method: 'PUT',
  //         body: JSON.stringify(cart),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw Error('Ошибка при отправке данных корзины!');
  //     }
  //     dispatch(
  //       mainActions.showStatusMessage({
  //         status: 'success',
  //         title: 'Data sent',
  //         message: 'Cards data was sending successfully!',
  //       })
  //     );
  //   };
  //   if (isInitialRunning) {
  //     isInitialRunning = false;
  //     return;
  //   }
  //   sendCartData().catch((e) => {
  //     dispatch(
  //       mainActions.showStatusMessage({
  //         status: 'error',
  //         title: 'Data sent with error',
  //         message: 'Cards data was sending with error!',
  //       })
  //     );
  //   });
  // }, [cart, dispatch]);

  //!!!Second - uses Thunk
  useEffect(() => {
    if (isInitialRunning) {
      isInitialRunning = false;
      return;
    }
    if (cart.isCartContentChanged) {
      dispatch(sendCartDataThunk(cart));
    }
  }, [cart, dispatch]);

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);

  return (
    <Fragment>
      {statusMessage && (
        <StatusBarMessage
          status={statusMessage.status}
          title={statusMessage.title}
          message={statusMessage.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
