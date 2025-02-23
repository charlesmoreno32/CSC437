import { useState, useEffect } from "react";
import { groceryFetcher } from "./groceryFetcher";

/**
 * Creates and returns a new promise that resolves after a specified number of milliseconds.
 *
 * @param {number} ms the number of milliseconds to delay
 * @returns {Promise<undefined>} a promise that resolves with the value of `undefined` after the specified delay
 */
function delayMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useGroceryFetch(source) {
  const [groceryData, setGroceryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isStale = false;

    async function fetchData(url) {
      setError(null);
      setIsLoading(true);
      setGroceryData([]);
      try {
        await delayMs(2000);
        const response = await groceryFetcher.fetch(url);

        const data = await response;
        if (!isStale) {
          setGroceryData(data);
        }
      } catch (error) {
        if (!isStale) {
          setError("Error fetching grocery data: " + error);
        }
      } finally {
        if (!isStale) {
          setIsLoading(false);
        }
      }
    }

    fetchData(source);
    return () => {
      isStale = true; // Runs whenever one or more dependencies change
    };
  }, [source]);

  return { groceryData, isLoading, error };
}
