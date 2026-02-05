import "../assets/style.css";
import Cart from "./Cart.tsx";
import Product from "./Product.tsx";
import { PRODUCTS } from "./products.ts";
import "../types.d.ts";

const App = () => {
  return (
    <div className="globalContainer">
      <Cart />

      <h1>商品とカート</h1>

      <div className="productsGrid">
        {PRODUCTS.map((product) => (
          <Product key={product.productId} {...product} />
        ))}
      </div>
    </div>
  );
};

export default App;
