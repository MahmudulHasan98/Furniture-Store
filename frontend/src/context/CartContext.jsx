import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // 1. Initialize Cart Items from LocalStorage
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  );

  // 2. Initialize Shipping Address from LocalStorage
  const [shippingAddress, setShippingAddress] = useState(
    localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
  );

  // 3. Save Cart Items to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // --- FUNCTIONS ---

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existItem = prevItems.find((x) => x._id === product._id);
      if (existItem) {
        return prevItems.map((x) =>
          x._id === existItem._id
            ? { ...existItem, qty: (existItem.qty || 1) + 1 }
            : x,
        );
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((x) => x._id !== id));
  };

  const updateQty = (id, qty) => {
    setCartItems((prevItems) =>
      prevItems.map((x) => (x._id === id ? { ...x, qty: Number(qty) } : x)),
    );
  };

  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };

  // --- FINAL RETURN (Only one!) ---
  return (
    <CartContext.Provider
      value={{
        cartItems,
        shippingAddress,
        addToCart,
        removeFromCart,
        updateQty,
        saveShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
