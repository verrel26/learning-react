import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import GroceryList from "./GroceryList";
import Footer from "./Footer";

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

  // Fungsi untuk menambahkan item baru ke dalam daftar belanjaan
  function handleAddItem(item) {
    setItems([...items, item]);
  }

  // Fungsi untuk menghapus item dari daftar belanjaan berdasarkan id
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleChecked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <GroceryList
        items={items}
        setItems={setItems}
        onDeleteItem={handleDeleteItem}
        onToggleChecked={handleToggleChecked}
        onClearList={handleClearList}
      />
      <Footer items={items} />
    </div>
  );
}
