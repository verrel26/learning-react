import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

export default function Home() {
  // untuk mendapatkan nilai product
  const products = getProducts();
  const [searchTerm, setSearchTerm] = useState("");

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
            <button
              className="search-clear"
              onClick={() => setSearchTerm("")}
            >
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
