import "./CategoryGallery.css";
import { Link } from "react-router";

interface CategoryGalleryProps {
  isLoading: boolean;
  fetchedCategories: Category[];
}

interface Category {
  categoryId: string;
  name: string;
  description: string;
  cover_src: string;
  images: string[];
}

export function CategoryGallery({
  isLoading,
  fetchedCategories,
}: CategoryGalleryProps) {
  const categoryElements = fetchedCategories.map((category) => (
    <div key={category.categoryId}>
      <Link
        to={"/categories/" + category.categoryId}
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
