import { useEffect, useState } from "react";
import { fetchApi } from "./api";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

export function useFetch<T>(endpoint: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchApi<T>(endpoint)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { data, loading, error };
}
