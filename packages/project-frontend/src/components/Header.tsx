import "./Header.css";
import { Link } from "react-router";
import { SearchBar } from "./SearchBar.tsx";
import { DarkModeToggle } from "./DarkModeToggle.tsx";
import React, { useState, useEffect } from "react";

interface HeaderProps {
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

export function Header({ isDarkMode, setDarkMode }: HeaderProps) {
  return (
    <header id="header">
      <nav>
        <Link to="/">Home</Link>
        {/* <div className="responsive-div"></div>
        <div className="responsive-div"></div>
        <div className="responsive-div"></div>
        <div className="responsive-div"></div>
        <div className="responsive-div"></div> */}
        <DarkModeToggle isDarkMode={isDarkMode} setDarkMode={setDarkMode} />

        <Link to="/profile">Profile Picture</Link>
      </nav>
    </header>
  );
}
