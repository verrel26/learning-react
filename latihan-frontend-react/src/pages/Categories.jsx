import { useEffect, useState } from "react";
import { api } from "../services/api";
import CategoriesModal from "../components/CateogiesModal";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await api("/categories");
      setCategories(response.data.data);
    } catch (error) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  // api("/categories").then((response) => {
  //   setCategories(response.data.data);
  // });

  // Function to handle create category
  const handleCreate = async (data) => {
    await api("/storeCategory", "POST", data);
    fetchCategories();
  };

  const handleUpdate = async (data) => {
    // await api(`/updateCategory/${selectedCategory.id}`, "PUT", data);
    await api(`/updateCategory/${data.id}`, "PUT", data);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    if (!id) {
      setError("No category selected for deletion");
      return;
    }
    await api(`/deleteCategory/${id}`, "DELETE");
    fetchCategories();
  };

  // return (
  //   <div>
  //     <h1>Categories</h1>
  //     {/* Menampilkan data categories, mirip foreach namun versi react */}
  //     <ul>
  //       {categories.map((category) => (
  //         <li key={category.id}>{category.name}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <div>
      <h1>List Categories</h1>
      <button onClick={() => setShowModal(true)}>+ Create Category</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
      <CategoriesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
      />

      <h1>updateCategory</h1>
      <li key={selectedCategory?.id}>
        {selectedCategory?.name}
        <button
          onClick={() => {
            setSelectedCategory(categories);
            setShowModal(true);
          }}
        >
          Update
        </button>
        <button onClick={() => handleDelete(selectedCategory.id)}>
          Delete
        </button>
      </li>

      <h1>Delete Category</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}{" "}
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <CategoriesModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCategory(null);
        }}
        initialData={selectedCategory}
        onSubmit={selectedCategory ? handleUpdate : handleCreate}
      />
    </div>
  );
}
