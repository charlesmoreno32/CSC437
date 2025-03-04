import { useState } from "react";
import "./SearchBar.css";

var url;
url = "http://localhost:8000";

export const SearchBar = ({ setSearchedCategories }) => {
  // Eventually goal is for user to be able to search by antything.
  const [input, setInput] = useState("");

  function fetchCategoriesByName(name) {
    const promise = fetch(`${url}/categories/?name=${name}`);
    return promise;
  }

  const fetchData = (value) => {
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
        placeholder="Search"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            fetchData(e.target.value);
          }
        }}
      />
    </div>
  );
};
