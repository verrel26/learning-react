// Real API

const API_URL = "https://fakestoreapi.com";

export async function getProduct() {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
}
