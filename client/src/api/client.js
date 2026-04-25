const API_URL = import.meta.env.VITE_API_URL || "/api";
const ADMIN_TOKEN_KEY = "jaipur-silver-admin-token";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type");
  const payload = contentType?.includes("application/json") ? await response.json() : null;

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed.");
  }

  return payload;
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function getProducts(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, value);
    }
  });

  const queryString = params.toString() ? `?${params.toString()}` : "";
  return request(`/products${queryString}`);
}

export function getProductById(id) {
  return request(`/products/${id}`);
}

export function submitInquiry(payload) {
  return request("/inquiries", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginAdmin(payload) {
  return request("/admin/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function logoutAdmin() {
  return request("/admin/logout", {
    method: "POST",
  });
}

export function getAdminProducts(token) {
  return request("/admin/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function createAdminProduct(token, payload) {
  return request("/admin/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export function updateAdminProduct(token, id, payload) {
  return request(`/admin/products/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
}

export function deleteAdminProduct(token, id) {
  return request(`/admin/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
