import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import Card from '../UI/Card';
import styles from './ProductItem.module.css';

const ProductItem = (props) => {
  // const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { id, title, price, description } = props;
  const addItemHandler = () => {
    // const updatedItemsQuality = cart.itemsQuantity + 1;
    // const updatedItems = cart.items.slice();
    // const existingItem = updatedItems.find((item) => item.id === id);
    // if (existingItem) {
    //   const updatedExistingItems = { ...existingItem };
    //   updatedExistingItems.quantity++;
    //   updatedExistingItems.totalPrice = updatedExistingItems.totalPrice + price;
    //   const existingItemIndex = updatedItems.findIndex(
    //     (item) => item.id === id
    //   );
    //   updatedItems[existingItemIndex] = updatedExistingItems;
    // } else {
    //   updatedItems.push({
    //     id: id,
    //     price: price,
    //     quantity: 1,
    //     totalPrice: price,
    //     title: title,
    //   });
    // }
    // const updatedCart = {
    //   itemsQuantity: updatedItemsQuality,
    //   items: updatedItems,
    // };
    // dispatch(cartActions.updateCart(updatedCart));
    dispatch(cartActions.addItem({ id, title, price }));
  };
  return (
    <li className={styles.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={styles.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={styles.actions}>
          <button onClick={addItemHandler}>Добавить в Корзину</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
