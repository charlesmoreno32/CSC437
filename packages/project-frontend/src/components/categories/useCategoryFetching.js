import { useEffect, useState } from "react";

const CATEGORIES = [
  {
    categoryId: "0",
    cover_src:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/2560px-Huskiesatrest.jpg",
    name: "Dogs",
    description: "A community for sharing man's best friend :)",
    image_IDs: [],
  },
  {
    categoryId: "1",
    cover_src:
      "https://upload.wikimedia.org/wikipedia/commons/8/84/Male_and_female_chicken_sitting_together.jpg",
    name: "Animals",
    description: "Pictures of different animals about their lives",
    image_IDs: [],
  },
  {
    categoryId: "2",
    cover_src: "/src/assets/IMG_6468.PNG",
    name: "Gaming",
    description: "Icon for gaming community photos and images",
    image_IDs: [],
  },
];

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param categoryId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{categoriesLoading: boolean, fetchedCategories: CategoryData[]}} fetch state and data
 */
export function useCategoryFetching(categoryId, delay = 1000) {
  const [categoriesLoading, setIsLoading] = useState(true);
  const [fetchedCategories, setFetchedCategories] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      if (categoryId === "") {
        setFetchedCategories(CATEGORIES);
      } else {
        setFetchedCategories(
          CATEGORIES.filter((category) => category.id === categoryId)
        );
      }
      setIsLoading(false);
    }, delay);
  }, [categoryId]);

  return { categoriesLoading, fetchedCategories };
}
