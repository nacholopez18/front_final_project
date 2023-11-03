import React from "react";

function SearchHeader({
  showSearch,
  searchTerm,
  onSearchChange,
  onSearchFocus,
  onDiscardSearch,
  title,
}) {
  return (
    <div className="searchHeader">
      {!showSearch && <h1 className="searchTitle">Buscador</h1>}
      <div className="searchBarInput">
        <img
          className="imgInputSearchbar"
          src="/style=outline, state=inactive (1).svg"
        />
        <input
          type="text"
          placeholder="Que deseas escuchar?"
          value={searchTerm}
          onFocus={onSearchFocus}
          onChange={onSearchChange}
        />
        <img
          onClick={() => onDiscardSearch()}
          className="imgInputGoBack"
          src="/cross.svg"
        />
      </div>
      <div className="divider">
        <h2 className="subTitleSearch">{title}</h2>
        <hr />
      </div>
    </div>
  );
}

export default SearchHeader;
