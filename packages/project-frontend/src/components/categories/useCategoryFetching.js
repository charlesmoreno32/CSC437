import { useEffect, useState } from "react";

/**
 * @typedef {Object} Category
 * @property {string} _id
 * @property {string} cover_src
 * @property {string} name
 * @property {string} description
 * @property {string[]} image_ids
 */

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{categoriesLoading: boolean, fetchedCategories: Category[]}} fetch state and data
 */

export function useCategoryFetching(categoryId, authToken, delay = 1000) {
  const [categoriesLoading, setIsLoading] = useState(true);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/categories/${categoryId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("GET images response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFetchedCategories(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      });
  }, [categoryId, authToken]);

  return { categoriesLoading, fetchedCategories };
}
