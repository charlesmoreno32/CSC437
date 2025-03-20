import { useCategoryFetching } from "./useCategoryFetching.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./CategoryGallery.css";
import { ImageGallery } from "../images/ImageGallery.js";

interface Category {
  _id: string;
  cover_src: string;
  name: string;
  description: string;
  image_ids: string[];
}

interface Image {
  _id: string;
  src: string;
  name: string;
  author: string;
  cat_ids: string[];
}

interface CategoryDetailsProps {
  authToken: string;
  isLoading: boolean;
  fetchedImages: Image[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export function CategoryDetails({
  isLoading,
  fetchedImages,
  authToken,
  setCategory,
}: CategoryDetailsProps) {
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId && typeof categoryId === "string") {
      setCategory(categoryId);
    }
  }, [categoryId, setCategory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!categoryId || typeof categoryId !== "string") {
    return <h2>Category not found</h2>;
  }

  const imageData = fetchedImages.filter(
    (image: Image) =>
      Array.isArray(image.cat_ids) && image.cat_ids.includes(categoryId)
  );

  if (!imageData) {
    return <h2>Category not found</h2>;
  }

  return (
    <div>
      <h2>{categoryId}</h2>
      <ImageGallery
        isLoading={isLoading}
        fetchedImages={fetchedImages}
        authToken={authToken}
      />
    </div>
  );
}
