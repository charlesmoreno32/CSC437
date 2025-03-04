import { CategoryGallery } from "./categories/CategoryGallery.jsx";

export function Homepage(props) {
  return (
    <div>
      <h2>Welcome, {props.userName}</h2>
      <CategoryGallery
        isLoading={props.isLoading}
        fetchedCategories={props.fetchedCategories}
      />
    </div>
  );
}
