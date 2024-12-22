import { useState } from "react";
import { FetchResult } from "@/interface/fetchData";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useFetchData = <T>(): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendRequest = async (
    url: string,
    method: string = "POST",
    body?: T
  ) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`${apiUrl}${url}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result: T = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, sendRequest };
};
