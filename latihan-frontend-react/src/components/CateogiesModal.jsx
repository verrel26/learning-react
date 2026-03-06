import { use, useEffect, useState } from "react";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData?.name ?? "");
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 VALIDATION
    if (!name.trim()) {
      setError("Nama category wajib diisi");
      return;
    }

    if (name.length < 3) {
      setError("Minimal 3 karakter");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await onSubmit({ name });
      setName("");
      onClose();
    } catch (err) {
      setError("Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={backdrop}>
      <div style={modal}>
        <h3>{initialData ? "Update Category" : "Tambah Category"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nama category"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

// simple inline style biar fokus logic
const backdrop = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.3)",
};

const modal = {
  background: "#fff",
  padding: 20,
  width: 300,
  margin: "100px auto",
};
export { CategoryModal };
