import { createSlice } from '@reduxjs/toolkit';
import { mainActions } from './main-slice';

const initialState = {
  items: [],
  itemsQuantity: 0,
  isCartContentChanged: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      state.isCartContentChanged = true;
      state.itemsQuantity++;
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      }
    },
    removeItem(state, action) {
      state.isCartContentChanged = true;
      state.itemsQuantity--;
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    updateCart(state, action) {
      // state.isCartContentChanged=false;
      state.itemsQuantity = action.payload.itemsQuantity;
      state.items = action.payload.items;
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;

export const sendCartDataThunk = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(
      mainActions.showStatusMessage({
        status: 'pending',
        title: 'Sending data...',
        message: 'Sending cart data',
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        'https://modernreactcustomhooks-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cartData.items,
            itemsQuantity: cartData.itemsQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw Error('Ошибка при отправке данных корзины!');
      }
    };
    try {
      await sendDataHttpRequest();
      dispatchAction(
        mainActions.showStatusMessage({
          status: 'success',
          title: 'Data sent',
          message: 'Cards data was sending successfully!',
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: 'error',
          title: 'Data sent with error',
          message: 'Cards data was sending with error!',
        })
      );
    }
  };
};

export const getCartData = () => {
  return async function (dispatchAction) {
    const getDataHttpRequest = async () => {
      const response = await fetch(
        'https://modernreactcustomhooks-default-rtdb.firebaseio.com/cart.json'
      );
      // console.log(response);
      if (!response.ok) {
        throw Error('Ошибка при получении данных!');
      }
      const reponseData = response.json();

      return reponseData;
    };
    try {
      const cartData = await getDataHttpRequest();
      dispatchAction(
        cartActions.updateCart({
          items: cartData.items || [],
          itemsQuantity: cartData.itemsQuantity,
        })
      );
    } catch (error) {
      dispatchAction(
        mainActions.showStatusMessage({
          status: 'error',
          title: 'Data recive with error',
          message: 'Cards data was recived with error!',
        })
      );
    }
  };
};
