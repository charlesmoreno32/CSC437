import { Header } from "./Header.jsx";
import { Outlet } from "react-router";
import { DarkModeToggle } from "./DarkModeToggle.jsx";
import "./MainLayout.css";

export function MainLayout({ setSearchedCategories, isDarkMode, setDarkMode }) {
  return (
    <div>
      <Header
        setSearchedCategories={setSearchedCategories}
        isDarkMode={isDarkMode}
        setDarkMode={setDarkMode}
      />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
