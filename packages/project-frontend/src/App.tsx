import { Homepage } from "./components/Homepage.tsx";
import { CategoryGallery } from "./components/categories/CategoryGallery.tsx";
import { CategoryDetails } from "./components/categories/CategoryDetails.tsx";
import { useCategoryFetching } from "./components/categories/useCategoryFetching.js";
import { ImageGallery } from "./components/images/ImageGallery.tsx";
import { ImageDetails } from "./components/images/ImageDetails.tsx";
import { useImageFetching } from "./components/images/useImageFetching.js";
import { MainLayout } from "./components/MainLayout.tsx";
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { AccountSettings } from "./components/AccountSettings.tsx";
import { Profile } from "./components/Profile.tsx";
import { RegisterPage } from "./components/auth/RegisterPage.tsx";
import { LoginPage } from "./components/auth/LoginPage.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";

interface Image {
  _id: string;
  src: string;
  name: string;
  author: string;
  cat_ids: string[];
}

interface Category {
  _id: string;
  name: string;
  description: string;
  cover_src: string;
  image_ids: string[];
}

interface User {
  _id: string;
  username: string;
  password: string;
  image_ids: string[];
}

function App() {
  const [loggedInUsername, setLoggedInUsername] = useState("User");
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("authToken") || "";
  });
  const [categoryId, setCategory] = useState("");
  const { categoriesLoading, fetchedCategories } = useCategoryFetching(
    "",
    authToken
  );
  const [userImages, setUserImages] = useState<Image[]>([]);
  const [categoryImages, setCategoryImages] = useState<Image[]>([]);
  const { imagesLoading, fetchedImages } = useImageFetching(
    "",
    authToken,
    categoryId
  );

  const [isDarkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (loggedInUsername && fetchedImages) {
      const userImages = fetchedImages.filter(
        (image: Image) => image.author === loggedInUsername
      );
      setUserImages(userImages);
    }
  }, [loggedInUsername, fetchedImages]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  useEffect(() => {
    if (categoryId && fetchedImages) {
      const categoryImages = fetchedImages.filter(
        (image: Image) =>
          Array.isArray(image.cat_ids) && image.cat_ids.includes(categoryId)
      );
      setCategoryImages(categoryImages);
    }
  }, [categoryId]);

  return (
    <Routes>
      <Route
        element={
          <MainLayout
            authToken={authToken}
            setAuthToken={setAuthToken}
            isDarkMode={isDarkMode}
            setDarkMode={setDarkMode}
          />
        }
      >
        <Route
          path="/"
          element={
            <ProtectedRoute authToken={authToken}>
              <Homepage
                userName={loggedInUsername}
                isLoading={categoriesLoading}
                fetchedCategories={fetchedCategories}
                authToken={authToken}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute authToken={authToken}>
              <Profile
                username={loggedInUsername}
                authToken={authToken}
                isLoading={imagesLoading}
                setAuthToken={setAuthToken}
                userImages={userImages}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute authToken={authToken}>
              <CategoryGallery
                isLoading={categoriesLoading}
                fetchedCategories={fetchedCategories}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:categoryId"
          element={
            <ProtectedRoute authToken={authToken}>
              <CategoryDetails
                isLoading={imagesLoading}
                fetchedImages={categoryImages}
                authToken={authToken}
                setCategory={setCategory}
              />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/images"
        element={
          <ProtectedRoute authToken={authToken}>
            <ImageGallery
              authToken={authToken}
              isLoading={imagesLoading}
              fetchedImages={fetchedImages}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/images/:imageId"
        element={
          <ProtectedRoute authToken={authToken}>
            <ImageDetails
              isLoading={imagesLoading}
              fetchedImages={fetchedImages}
            />
          </ProtectedRoute>
        }
      />

      <Route
        path="/register"
        element={
          <RegisterPage
            setAuthToken={setAuthToken}
            setLoggedInUsername={setLoggedInUsername}
          />
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            setAuthToken={setAuthToken}
            setLoggedInUsername={setLoggedInUsername}
          />
        }
      />
    </Routes>
  );
}

export default App;
