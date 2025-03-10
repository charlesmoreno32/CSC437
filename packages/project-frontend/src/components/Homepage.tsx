import { CategoryGallery } from "./categories/CategoryGallery.tsx";

interface HomepageProps {
  userName: string;
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

export function Homepage({
  userName,
  isLoading,
  fetchedCategories,
}: HomepageProps) {
  return (
    <div>
      <h2>Welcome, {userName}</h2>
      <CategoryGallery
        isLoading={isLoading}
        fetchedCategories={fetchedCategories}
      />
    </div>
  );
}
