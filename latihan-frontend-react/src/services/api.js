const API_URL = "http://learning-laravel-react.test/api";

export async function api(url, method = "GET", body = null) {
  const token = localStorage.getItem("access_token");

  const res = await fetch(API_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    throw new Error("API request failed");
  }
  return res.json();
}
