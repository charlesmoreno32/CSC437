import "./CategoryGallery.css";
import { Link } from "react-router";

interface CategoryGalleryProps {
  isLoading: boolean;
  fetchedCategories: Category[];
}

interface Category {
  _id: string;
  name: string;
  description: string;
  cover_src: string;
  image_ids: string[];
}

export function CategoryGallery({
  isLoading,
  fetchedCategories,
}: CategoryGalleryProps) {
  const categoryElements = fetchedCategories.map((category) => (
    <div key={category._id}>
      <Link
        to={"/categories/" + category._id}
        className="ImageGallery-preview-link"
      >
        <img src={category.cover_src} alt={category.description} />
        <p>{category.name}</p>
      </Link>
    </div>
  ));
  return (
    <div>
      {isLoading && "Loading..."}
      <div className="ImageGallery">{categoryElements}</div>
    </div>
  );
}
