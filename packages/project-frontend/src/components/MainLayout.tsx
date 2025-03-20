import React, { useState, useEffect } from "react";
import { Header } from "./Header.tsx";
import { Outlet } from "react-router";
import "./MainLayout.css";

interface MainLayoutProps {
  authToken: string;
  setAuthToken: React.Dispatch<React.SetStateAction<string>>;
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
  authToken,
  setAuthToken,
  isDarkMode,
  setDarkMode,
}: MainLayoutProps) {
  return (
    <div id="mainlayout_container">
      <Header
        isDarkMode={isDarkMode}
        setDarkMode={setDarkMode}
        authToken={authToken}
        setAuthToken={setAuthToken}
      />
      <div id="mainlayout_outlet">
        <Outlet />
      </div>
    </div>
  );
}
