import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../data/products";

export default function Home() {
  // untuk mendapatkan nilai product
  const [searchTerm, setSearchTerm] = useState("");
  const products = getProducts();
  const [page, setPage] = useState(1);
  const productsPerPage = 6;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const displayProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage,
  );

  const filterProducts = products.filter((products) =>
    products.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
  );

  return (
    <div className="page">
      <div className="home-hero">
        <h1 className="home-title">Welcome to Reset Shop</h1>
        <p className="home-subtitle">
          Discover amazing products at great prices
        </p>
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.validationMessage)}
      />
      <ProductCard products={filterProducts} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <div className="container">
        <h2 className="page-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
