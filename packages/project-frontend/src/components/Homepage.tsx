import { CategoryGallery } from "./categories/CategoryGallery.tsx";
import { SearchBar } from "./SearchBar.tsx";

interface HomepageProps {
  userName: string;
  isLoading: boolean;
  fetchedCategories: Category[];
  setDisplayedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

interface Category {
  categoryId: string;
  name: string;
  description: string;
  cover_src: string;
  images: string[];
}

export function Homepage({
  userName,
  isLoading,
  fetchedCategories,
  setDisplayedCategories,
}: HomepageProps) {
  return (
    <div>
      <h2>Welcome, {userName}</h2>
      <SearchBar setSearchedCategories={setDisplayedCategories} />
      <CategoryGallery
        isLoading={isLoading}
        fetchedCategories={fetchedCategories}
      />
    </div>
  );
}
