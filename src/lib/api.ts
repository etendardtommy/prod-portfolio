const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const base = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const res = await fetch(`${base}${path}`, {
    headers: { "x-site-id": "1" },
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }
  return res.json();
}

export async function postApi<T>(endpoint: string, data: unknown): Promise<T> {
  const base = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-site-id": "1",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP: ${res.status}`);
  }
  return res.json();
}
