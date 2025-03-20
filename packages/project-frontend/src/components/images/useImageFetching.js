import { useEffect, useState } from "react";

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
export function useImageFetching(imageId, authToken, delay = 1000) {
  const [imagesLoading, setIsLoading] = useState(true);
  const [fetchedImages, setFetchedImages] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/images/${imageId}`, {
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
        setFetchedImages(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setIsLoading(false);
      });
  }, [imageId, authToken]);

  return { imagesLoading, fetchedImages };
}
