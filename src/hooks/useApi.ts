import { useCallback, useEffect, useState } from "react";
import { errorMessage } from "@/lib/api";

export function useApi<T>(loader: () => Promise<T>, dependencies: readonly unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await loader());
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => { void reload(); }, [reload]);

  return { data, setData, loading, error, reload };
}
