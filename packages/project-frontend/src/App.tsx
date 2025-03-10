import { Homepage } from "./components/Homepage.tsx";
import { CategoryGallery } from "./components/categories/CategoryGallery.tsx";
import { CategoryDetails } from "./components/categories/CategoryDetails.tsx";
import { useCategoryFetching } from "./components/categories/useCategoryFetching.js";
import { MainLayout } from "./components/MainLayout.tsx";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { AccountSettings } from "./components/AccountSettings.tsx";
import { Profile } from "./components/Profile.tsx";

interface Category {
  categoryId: string;
  name: string;
  description: string;
  cover_src: string;
  images: string[];
}

function App() {
  const [accountUsername, setAccountUsername] = useState("User");
  const { categoriesLoading, fetchedCategories } = useCategoryFetching("");
  const [displayedCategories, setDisplayedCategories] = useState<Category[]>(
    []
  );
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            setDisplayedCategories={setDisplayedCategories}
            isDarkMode={isDarkMode}
            setDarkMode={setDarkMode}
          />
        }
      >
        <Route
          path="/"
          element={
            <Homepage
              isLoading={categoriesLoading}
              fetchedCategories={fetchedCategories}
              userName={accountUsername}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              username={accountUsername}
              onUsernameChange={setAccountUsername}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <CategoryGallery
              isLoading={categoriesLoading}
              fetchedCategories={fetchedCategories}
            />
          }
        />
        <Route path="/categories/:categoryId" element={<CategoryDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
