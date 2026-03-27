import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
// import { getProducts } from "../data/products"; // dari local (frontend)
import { getProducts } from "../services/api"; // dari backhend

export default function Home() {
  // untuk mendapatkan nilai product
  // const products = getProducts(); // dari local (frontend)
  const [products, setProduct] = useState([]); // dari API backhend
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadProducts();
  }, []);

  // Filter berdasarkan search
  const filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to Reset Shop</h1>
        <p className="home-subtitle">
          Discover amazing products at great prices
        </p>
      </div>
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="search-clear" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="container">
        <div className="product-grid">
          {filterProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
