import { useState, useEffect, useRef, useCallback } from "react";
import type { CommandEvent } from "../types";

export const CART_ID = "cart";
const CART_DROPDOWN_ID = "cart-dropdown";

interface CartItem {
  productId: string;
  productName: string;
  count: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = useCallback(
    (productId: string, productName: string) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.productId === productId);
        if (existingItem) {
          return prevItems.map((item) =>
            item.productId === productId ? { ...item, count: item.count + 1 } : item,
          );
        } else {
          return [...prevItems, { productId, productName, count: 1 }];
        }
      });
    },
    [setCartItems],
  );

  const handleCommand = useCallback(
    (event: CommandEvent) => {
      const source = event.source;
      const productId = source.dataset.productId;
      const productName = source.dataset.productName;

      if (!productId || !productName) return;

      handleAddToCart(productId, productName);
    },
    [handleAddToCart],
  );

  useEffect(() => {
    const cartElement = cartRef.current;
    if (!cartElement) return;

    cartElement.addEventListener("command", handleCommand);

    return () => {
      cartElement.removeEventListener("command", handleCommand);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="cartContainer">
      <button
        ref={cartRef}
        id={CART_ID}
        className="cartHeader"
        commandfor={CART_DROPDOWN_ID}
        aria-label="カートを開く"
        command="toggle-popover"
      >
        <span className="cartIcon">🛒</span>
        {totalItems > 0 && <span className="cartBadge">{totalItems}</span>}
      </button>

      <div id={CART_DROPDOWN_ID} popover="auto">
        <div ref={dropdownRef} className="cartDropdown">
          <div className="cartDropdownHeader">
            <h3 className="cartDropdownTitle">カート</h3>
          </div>
          <div className="cartItemsList">
            {cartItems.length === 0 ? (
              <p className="cartEmptyMessage">カートは空です</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.productId} className="cartItem">
                  <div className="cartItemInfo">
                    <span className="cartItemName">{item.productName}</span>
                    <span className="cartItemCount">× {item.count}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
