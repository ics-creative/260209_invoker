import { CART_ID } from "./Cart.tsx";
import type { Product as ProductType } from "./products.ts";
import "../types.d.ts";

const Product: React.FC<ProductType> = ({
  productId,
  productName,
  price,
  imageUrl,
  description,
}) => {
  return (
    <div className="productCard">
      <div className="productImageContainer">
        <img src={imageUrl} alt={productName} className="productImage" />
      </div>
      <div className="productInfo">
        <h3 className="productName">{productName}</h3>
        <p className="productPrice">¥{price.toLocaleString()}</p>
        <p className="productDescription">{description}</p>
      </div>
      <button
        className="basicButton addToCartButton"
        command="--add-to-cart"
        commandfor={CART_ID}
        data-product-id={productId}
        data-product-name={productName}
      >
        カートへ追加
      </button>
    </div>
  );
};

export default Product;
