import { Homepage } from "./components/Homepage.jsx";
import { CategoryGallery } from "./components/categories/CategoryGallery.jsx";
import { CategoryDetails } from "./components/categories/CategoryDetails.jsx";
import { useCategoryFetching } from "./components/categories/useCategoryFetching.js";
import { MainLayout } from "./components/MainLayout.jsx";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { AccountSettings } from "./components/AccountSettings.jsx";
import { Profile } from "./components/Profile.jsx";

function App() {
  const [accountUsername, setAccountUsername] = useState("User");
  const { categoriesLoading, fetchedCategories } = useCategoryFetching("");
  const [displayedCategories, setDisplayedCategories] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            setSearchedCategories={setDisplayedCategories}
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
