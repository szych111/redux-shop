import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [
  {title: 'cheese', description: 'good cheese', price: 2},
  {title: 'flour', description: 'good flour', price: 1},
  {title: 'bread', description: 'good bread', price: 3},
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map(product => 
        <ProductItem
          key={product.title}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;
