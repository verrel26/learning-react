import { useState } from "react";

export default function Form({ onAddItem }) {
  const [name, setName] = useState("");
  // Menggunakan state untuk menyimpan jumlah barang yang dipilih, 1 sebagai nilai awal/default
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    // Jika nama barang kosong, jangan buat item baru dan keluar dari fungsi
    if (!name) return;

    const newItem = {
      id: Date.now(),
      name,
      quantity,
      checked: false,
    };

    onAddItem(newItem);

    // Setelah submit, reset input nama dan jumlah barang ke nilai awal/default
    setName("");
    // Setelah submit, reset jumlah barang ke nilai awal/default (1)
    setQuantity(1);
  }

  // Membuat array angka 1-10 untuk opsi jumlah barang
  const quantityNum = [...Array(20).keys()].map((num) => num + 1);
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {/* Menampilkan hasil dari array quantityNum */}
          {quantityNum.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="nama barang..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button>Tambah</button>
    </form>
  );
}
