import ProductItem from './ProductItem';
import styles from './Products.module.css';

const DUMMY_ITEMS = [
  {
    id: 1,
    price: 7,
    title: 'Супер-Товар1',
    description:
      'Благодаря своему высокому качеству, этот товар прослужит вам очень долго.',
  },
  {
    id: 2,
    price: 11,
    title: 'Супер-Товар2',
    description:
      '222Благодаря своему высокому качеству, этот товар прослужит вам очень долго.',
  },
  {
    id: 3,
    price: 2,
    title: 'Супер-Товар3',
    description:
      '333Благодаря своему высокому качеству, этот товар прослужит вам очень долго.',
  },
];
const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {DUMMY_ITEMS.map((e) => (
          <ProductItem
            key={e.id}
            id={e.id}
            title={e.title}
            price={e.price}
            description={e.description}
          />
        ))}
        {/* <ProductItem
          title="Супер-Товар"
          price={7}
          description="Благодаря своему высокому качеству, этот товар прослужит вам очень долго."
        /> */}
      </ul>
    </section>
  );
};

export default Products;
