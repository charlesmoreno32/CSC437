import { useCategoryFetching } from "./useCategoryFetching.js";
import { useParams } from "react-router-dom";
import "./CategoryGallery.css";

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
}

interface CategoryDetailsProps {
  isLoading: boolean;
  fetchedImages: Image[];
}

export function CategoryDetails({
  isLoading,
  fetchedImages,
}: CategoryDetailsProps) {
  const { categoryId } = useParams();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const categoryData = fetchedImages.find(
    (category) => category._id === categoryId
  );
  if (!categoryData) {
    return <h2>Category not found</h2>;
  }

  return (
    <div>
      <h2>{categoryData.name}</h2>
      <img
        className="ImageDetails-img"
        src={categoryData.cover_src}
        alt={categoryData.description}
      />
    </div>
  );
}
