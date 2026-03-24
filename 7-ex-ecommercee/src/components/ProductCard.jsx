import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { memo, useEffect } from "react";
import { getProductById } from "../data/products";

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  // const productInCart = cartItems.find((item) => item.id === product.id);
  // const ProductCard = memo(function ProductCard({ product }) {});

  const productInCart2 = useMemo(
    () => cartItems.find((item) => item.id === product.id),
    [cartItems, product.id],
  );

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  const productQuantityLabel = productInCart
    ? `(${productInCart.quantity})`
    : "";
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card-image"
      />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          {/* Mengarahkan ke halaman detail */}
          <Link className="btn btn-secondary" to={`/products/${product.id}`}>
            View Details
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product.id)}
          >
            Add to cart {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
