import { useEffect, useState } from "react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DarkModeToggle({
  isDarkMode,
  setDarkMode,
}: DarkModeToggleProps) {
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <label>
      <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
      Dark Mode
    </label>
  );
}
