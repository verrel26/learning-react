// API VERSION
import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addToCart as addToCartAPI,
  updateCart,
  removeFromCart as removeFromCartAPI,
} from "../services/api";
import { getProducts } from "../services/api";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const { token } = useAuth();

  // Load product saat mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    }

    loadProducts();
  }, []);

  // Load cart saat token berubah
  useEffect(() => {
    async function loadCart() {
      if (!token) {
        setCartItems([]);
        return;
      }

      try {
        const response = await getCart(token);
        if (response.success && response.data) {
          setCartItems(response.data.items || []);
        }
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }

    loadCart();
  }, [token]);

  async function addToCart(productId) {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const response = await addToCartAPI(productId, 1, token);

      if (response.success && response.data) {
        setCartItems(response.data.items || []);
        alert("Item added to cart");
      } else {
        alert(response.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  }

  async function updateQuantity(productId, quantity) {
    if (!token) {
      alert("Please login to update cart");
      return;
    }

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      const response = await updateCart(productId, quantity, token);

      if (response.success && response.data) {
        setCartItems(response.data.items || []);
      } else {
        alert(response.message || "Failed to update cart");
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart");
    }
  }

  async function removeFromCart(productId) {
    if (!token) {
      alert("Please login to update cart");
      return;
    }

    try {
      const response = await removeFromCartAPI(productId, token);
      if (response.success && response.data) {
        setCartItems(response.data.items || []);
      } else {
        alert(response.message || "Failed to remove from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove from cart");
    }
  }

  function getCartItemsWithProducts() {
    return cartItems
      .map((item) => ({
        id: item.productId,
        quantity: item.quantity,
        product: products.find((p) => p.id === item.productId),
      }))
      .filter((item) => item.product);
  }

  function getCartTotal() {
    const total = cartItems.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    return total;
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProducts,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
// LOCAL STORAGE VERSION
// import { createContext, useState, useContext } from "react";
// import { getProductById } from "../data/products";

// const CartContext = createContext(null);

// export default function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   function addToCart(productId) {
//     const existing = cartItems.find((item) => item.id === productId);
//     if (existing) {
//       const currentQuantity = existing.quantity;
//       const updateCartItems = cartItems.map((item) =>
//         item.id === productId
//           ? { id: productId, quantity: currentQuantity + 1 }
//           : item,
//       );
//       setCartItems(updateCartItems);
//     } else {
//       setCartItems([...cartItems, { id: productId, quantity: 1 }]);
//     }
//   }

//   function getCartItemsWithProducts() {
//     return cartItems
//       .map((item) => ({
//         ...item,
//         product: getProductById(item.id),
//       }))
//       .filter((item) => item.product);
//   }

//   function removeFromCart(productId) {
//     setCartItems(cartItems.filter((item) => item.id !== productId));
//   }

//   function updateQuantity(productId, quantity) {
//     if (quantity <= 0) {
//       removeFromCart(productId);
//       return;
//     }
//     setCartItems(
//       cartItems.map((item) =>
//         item.id === productId ? { ...item, quantity } : item,
//       ),
//     );
//   }

//   function getCartTotal() {
//     const total = cartItems.reduce((total, item) => {
//       const product = getProductById(item.id);
//       return total + (product ? product.price * item.quantity : 0);
//     }, 0);

//     return total;
//   }

//   function clearCart() {
//     setCartItems([]);
//   }
//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         getCartItemsWithProducts,
//         removeFromCart,
//         updateQuantity,
//         getCartTotal,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   const context = useContext(CartContext);

//   return context;
// }
