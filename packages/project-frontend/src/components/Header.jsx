import "./Header.css";
import { Link } from "react-router";
import { SearchBar } from "./SearchBar.jsx";
import { DarkModeToggle } from "./DarkModeToggle.jsx";

export function Header({ setSearchedCategories, isDarkMode, setDarkMode }) {
  return (
    <header>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <DarkModeToggle isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
          <SearchBar setSearchedCategories={setSearchedCategories} />
          <Link to="/profile">Profile Picture</Link>
        </nav>
      </div>
    </header>
  );
}
