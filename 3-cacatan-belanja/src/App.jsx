import { useState } from "react";

const growceryItems = [
  {
    id: 1,
    name: "Kopi bubuk",
    quantity: 10,
    checked: true,
  },
  {
    id: 2,
    name: "Teh es",
    quantity: 20,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral xxx",
    quantity: 3,
    checked: false,
  },
];

export default function App() {
  const [items, setItems] = useState(growceryItems);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <GroceryList items={items} setItems={setItems} />
      <Footer items={items} />
    </div>
  );
}

function Header() {
  return <h1>Notes My Shopping</h1>;
}

function Form({ onAddItem }) {
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

function GroceryList({ items, setItems }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.length === 0 ? (
            <p>Daftar belanja masih kosong 🛒</p>
          ) : (
            items.map((item) => (
              <Item item={item} key={item.id} setItems={setItems} />
            ))
          )}
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function Item({ item }) {
  return (
    <li>
      {/* <input type="checkbox" checked={item.checked} /> */}
      <input type="checkbox" defaultChecked={item.checked} />
      <span
        style={{
          textDecoration: item.checked ? "line-through" : "none",
          opacity: item.checked ? 0.5 : 1,
        }}
      >
        {item.quantity} {item.name}
      </span>
      <button>&times;</button>
    </li>
  );
}
// function Footer() {
//   const totalItems = growceryItems.length;
//   const checkedItems = growceryItems.filter((item) => item.checked).length;
//   const percentage = Math.round((checkedItems / totalItems) * 100);

//   return (
//     <footer className="stats">
//       Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah
//       dibeli ({percentage}%)
//     </footer>
//   );
// }

function Footer({ items }) {
  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage =
    totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

  return (
    <footer className="stats">
      Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah
      dibeli ({percentage}%)
    </footer>
  );
}
