const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function buildUrl(endpoint: string): string {
  const base = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

async function handleError(res: Response): Promise<never> {
  let message = `Erreur HTTP: ${res.status}`;
  try {
    const body = await res.json();
    if (body?.detail) message += ` — ${body.detail}`;
  } catch {}
  throw new Error(message);
}

export async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(buildUrl(endpoint), {
    headers: { "x-site-id": "1" },
  });

  if (!res.ok) await handleError(res);
  return res.json();
}

export async function postApi<T>(endpoint: string, data: unknown): Promise<T> {
  const res = await fetch(buildUrl(endpoint), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-site-id": "1",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) await handleError(res);
  return res.json();
}
