import { useCategoryFetching } from "./useCategoryFetching.js";
import { useParams } from "react-router-dom";
import "./CategoryGallery.css";

export function CategoryDetails() {
  const { categoryId } = useParams();
  if (!categoryId) {
    return <h2>Invalid category</h2>;
  }
  const { categoriesLoading, fetchedCategories } = useCategoryFetching(
    categoryId,
    500
  );
  if (categoriesLoading) {
    return <div>Loading...</div>;
  }
  const categoryData = fetchedCategories[0];
  if (!categoryData) {
    return (
      <h2>
        Category {categoryId} not found. This implementation will be done later
        when able to do backend queries.
      </h2>
    );
  }
  console.log(categoryData.cover_src);

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
