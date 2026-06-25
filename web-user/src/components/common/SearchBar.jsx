import React from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";

function SearchBar({
  searchBarClassName,
  searchIconClassName,
  searchInputClassName,
  placeholder,
}) {
  return (
    <div className={`${styles.searchBar} ${searchBarClassName || ""}`}>
      <SearchIcon className={`${styles.icon} ${searchIconClassName || ""}`} />
      <input
        className={`${styles.input} ${searchInputClassName || ""}`}
        placeholder={placeholder || "Search"}
      />
    </div>
  );
}

export default SearchBar;
