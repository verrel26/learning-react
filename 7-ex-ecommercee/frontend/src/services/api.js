// Real API / API dummy dari luar

// const API_URL = "https://fakestoreapi.com";

// export async function getProduct() {
//   const response = await fetch(`${API_URL}/products`);
//   return response.json();
// }

// export async function getProductById(id) {
//   const response = await fetch(`${API_URL}/products/${id}`);
//   return response.json();
// }

// API dari backhend
const API_URL = "http://localhost:3001/api";
console.log(API_URL);

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

// Auth
export async function register(username, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
}

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
}

export async function getMe(token) {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

// Cart
export async function getCart(token) {
  const response = await fetch(`${API_URL}/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export async function addToCart(productId, quantity, token) {
  const response = await fetch(`${API_URL}/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return response.json();
}

export async function updateCart(productId, quantity, token) {
  const response = await fetch(`${API_URL}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId, quantity }),
  });
  return response.json();
}

export async function removeFromCart(productId, token) {
  const response = await fetch(`${API_URL}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
