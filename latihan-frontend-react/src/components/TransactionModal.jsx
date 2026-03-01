import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function TransactionModal({
  isOpen,
  onClose,
  products = [],
  initialData = null,
  onSuccess,
}) {
  const [product_id, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setProductId(initialData.product_id);
      setQuantity(initialData.quantity);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user_id || !product_id || quantity <= 0) {
      setError("All fields required");
      return;
    }

    setLoading(true);
    try {
      if (initialData) {
        await api(`/updateTransaction/${initialData.id}`, "PUT", {
          user_id,
          product_id,
          quantity,
        });
      } else {
        await api("/storeTransaction", "POST", {
          user_id,
          product_id,
          quantity,
        });
      }

      onSuccess();
      onClose();
    } catch {
      setError("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h3>{initialData ? "Edit" : "Add"} Transactionn</h3>

        <form onSubmit={handleSubmit}>
          <select
            value={product_id}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button disabled={loading}>{loading ? "Saving..." : "Save"}</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const backdrop = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "#fff",
  padding: 20,
  width: 300,
};
