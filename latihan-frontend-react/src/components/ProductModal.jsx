import { useEffect, useState } from "react";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  categories = [],
}) {
  const [category_id, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock_quantity, setStockQuantity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCategoryId(initialData?.category_id ?? "");
      setName(initialData?.name ?? "");
      setPrice(initialData?.price ?? "");
      setStockQuantity(initialData?.stock_quantity ?? "");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 VALIDATION
    if (!category_id.trim()) {
      setError("Category is required");
      return;
    }
    if (!name.trim()) {
      setError("Product name is required");
      return;
    }
    if (!price || isNaN(price) || parseFloat(price) <= 0) {
      setError("Valid price is required");
      return;
    }
    if (
      !stock_quantity ||
      isNaN(stock_quantity) ||
      parseInt(stock_quantity) < 0
    ) {
      setError("Valid stock quantity is required");
      return;
    }

    setError("");

    setLoading(true);

    try {
      await onSubmit({
        category_id: Number(category_id),
        name,
        price: Number(price),
        stock_quantity: Number(stock_quantity),
      });
      setName("");
      onClose();
    } catch (err) {
      setError("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  // Tampilan Modal
  return (
    <div style={backdrop}>
      <div style={modal}>
        <h3>{initialData ? "Update Product" : "Add Product"}</h3>

        <form onSubmit={handleSubmit}>
          <select
            name="category_id"
            value={category_id}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            placeholder="Quantity Stok"
            type="number"
            value={stock_quantity}
            onChange={(e) => setStockQuantity(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
          </button>

          <button type="button" onClick={onClose}>
            Batal
          </button>
        </form>
      </div>
    </div>
  );
}
// Style modal
const backdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modal = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  width: "400px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};
export { ProductModal };
