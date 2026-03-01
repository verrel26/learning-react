import { useEffect, useState } from "react";
import { api } from "../services/api";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api("/products");
      setProducts(response.data.data);
    } catch (error) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api("/categories");
      setCategories(res.data.data);
    } catch (error) {
      setError("Faild to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // api("/products").then((response) => {
    //   setProducts(response.data.data);
    // });
  }, []);

  // Tambah data
  const handleCreate = async (data) => {
    await api("/storeProduct", "POST", data);
    fetchProducts();
  };

  // Update data
  const handleUpdate = async (data) => {
    await api(`/updateProduct/${data.id}`, "PUT", data);
    fetchProducts();
  };

  // Delete data
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    if (!id) {
      setError("No product selected for deletion");
      return;
    }
    await api(`/deleteProduct/${id}`, "DELETE");
    fetchProducts();
  };

  return (
    <div>
      <h1>Products</h1>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        Create Product
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && products.length === 0 && <p>No products available.</p>}
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.category_id}- {product.name} - ${product.price}{" "}
            <button
              onClick={() => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
            >
              Edit
            </button>
            &nbsp; &nbsp;
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ProductModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        onSubmit={selectedProduct ? handleUpdate : handleCreate}
        initialData={selectedProduct}
      />
      <ProductModal
        isOpen={ProductModal}
        onClose={() => {
          setShowModal(false);
          setSelectedProduct(null);
        }}
        onSubmit={selectedProduct ? handleUpdate : handleCreate}
        initialData={selectedProduct}
        categories={categories}
      />
      ;
    </div>
  );
}
