import { useEffect, useState } from "react";
import { api } from "../services/api";
import TransactionModal from "../components/TransactionModal";

export default function Transactions() {
  const [transactions, setTransaction] = useState([]);

  const [users, setUser] = useState([]);
  const [products, setProduct] = useState([]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Relasi

  const fethAll = async () => {
    setLoading(true);
    try {
      const [t, u, p] = await Promise.all([
        api("/transactions"),
        api("/users"),
        api("/products"),
      ]);

      setTransaction(t.data.data);
      setUser(u.data.data);
      setProduct(p.data.data);
    } catch (error) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fethAll();
  }, []);

  // Mendapatkan product_id get name
  const getProductName = (id) =>
    Array.isArray(products)
      ? products.find((p) => p.id === id)?.name || "-"
      : "-";

  return (
    <div>
      <h1>Transactions</h1>

      <button onClick={() => setShowModal(true)}>+ Create Transaction</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && transactions.length === 0 && <p>No Transaction available</p>}

      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Sub Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={t.id}>
              <td>{index + 1}</td>
              <td>{getProductName(t.product_id)}</td>
              <td>{t.quantity}</td>
              <td>{t.subtotal}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedTransaction(t);
                    setShowModal(true);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <TransactionModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedTransaction(null);
        }}
        users={users}
        products={products}
        initialData={selectedTransaction}
        onSuccess={fethAll}
      ></TransactionModal>
    </div>
  );
}
