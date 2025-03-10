import React, { useState, useEffect } from "react";
import { Header } from "./Header.tsx";
import { Outlet } from "react-router";
import "./MainLayout.css";

interface MainLayoutProps {
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

export function MainLayout({
  setDisplayedCategories,
  isDarkMode,
  setDarkMode,
}: MainLayoutProps) {
  return (
    <div>
      <Header
        setDisplayedCategories={setDisplayedCategories}
        isDarkMode={isDarkMode}
        setDarkMode={setDarkMode}
      />
      <div id="mainlayout_outlet">
        <Outlet />
      </div>
    </div>
  );
}
