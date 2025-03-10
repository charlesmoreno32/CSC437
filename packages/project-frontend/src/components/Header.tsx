import "./Header.css";
import { Link } from "react-router";
import { SearchBar } from "./SearchBar.tsx";
import { DarkModeToggle } from "./DarkModeToggle.tsx";
import React, { useState, useEffect } from "react";

interface HeaderProps {
  setDisplayedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Category {
  categoryId: string;
  name: string;
  description: string;
  cover_src: string;
  images: string[];
}

export function Header({
  setDisplayedCategories,
  isDarkMode,
  setDarkMode,
}: HeaderProps) {
  return (
    <header>
      <div>
        <nav>
          <Link to="/">Home</Link>
          <DarkModeToggle isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
          <SearchBar setSearchedCategories={setDisplayedCategories} />
          <Link to="/profile">Profile Picture</Link>
        </nav>
      </div>
    </header>
  );
}
