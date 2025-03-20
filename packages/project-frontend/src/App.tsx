import { Homepage } from "./components/Homepage.tsx";
import { CategoryGallery } from "./components/categories/CategoryGallery.tsx";
import { CategoryDetails } from "./components/categories/CategoryDetails.tsx";
import { useCategoryFetching } from "./components/categories/useCategoryFetching.js";
import { ImageGallery } from "./components/categories/CategoryGallery.tsx";
import { ImageDetails } from "./components/categories/CategoryDetails.tsx";
import { useImageFetching } from "./components/categories/useCategoryFetching.js";
import { MainLayout } from "./components/MainLayout.tsx";
import { Routes, Route } from "react-router";
import { useState } from "react";
import { AccountSettings } from "./components/AccountSettings.tsx";
import { Profile } from "./components/Profile.tsx";
import { RegisterPage } from "./components/auth/RegisterPage.tsx";
import { LoginPage } from "./components/auth/LoginPage.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";

interface Category {
  categoryId: string;
  name: string;
  description: string;
  cover_src: string;
  images: string[];
}

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState("User");
  const [authToken, setAuthToken] = useState("");
  const { categoriesLoading, fethcedCategories } = useCategoryFetching(
    "",
    authToken
  );
  const { imagesLoading, fetchedImages } = useImageFetching("", authToken);
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
              setDisplayedCategories={setDisplayedCategories}
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
        <Route
          path="/categories/:categoryId"
          element={<CategoryDetails fetchedImages={fetchedImages} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
