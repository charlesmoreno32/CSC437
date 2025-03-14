import React, { useState, useEffect } from "react";
import "./SearchBar.css";

var url: string = "http://localhost:8000";

interface SearchProps {
  setSearchedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

interface Category {
  categoryId: string;
  name: string;
  description: string;
  cover_src: string;
  images: string[];
}

export const SearchBar = ({ setSearchedCategories }: SearchProps) => {
  // Eventually goal is for user to be able to search by antything.
  const [input, setInput] = useState("");

  function fetchCategoriesByName(name: string) {
    const promise = fetch(`${url}/categories/?name=${name}`);
    return promise;
  }

  const fetchData = (value: string) => {
    fetchCategoriesByName(value)
      .then((res) => res.json())
      .then((json) => {
        setSearchedCategories(json);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="input-wrapper">
      <input
        className="searchbar"
        placeholder="Search"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchData(e.currentTarget.value);
          }
        }}
      />
    </div>
  );
};
