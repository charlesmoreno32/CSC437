import { CategoryGallery } from "./categories/CategoryGallery.tsx";
import { SearchBar } from "./SearchBar.tsx";

interface HomepageProps {
  userName: string;
  isLoading: boolean;
  fetchedCategories: Category[];
  authToken: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  cover_src: string;
  image_ids: string[];
}

export function Homepage({
  userName,
  isLoading,
  fetchedCategories,
  authToken,
}: HomepageProps) {
  return (
    <div>
      <h2>Welcome, {userName}</h2>
      {/* <SearchBar  /> */}
      <CategoryGallery
        isLoading={isLoading}
        fetchedCategories={fetchedCategories}
      />
    </div>
  );
}
