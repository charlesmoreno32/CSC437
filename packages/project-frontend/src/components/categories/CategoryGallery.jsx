import { MainLayout } from "../MainLayout.jsx";
import { useCategoryFetching } from "./useCategoryFetching.js";
import "./CategoryGallery.css";
import { Link } from "react-router";

export function CategoryGallery({ isLoading, fetchedCategories }) {
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
