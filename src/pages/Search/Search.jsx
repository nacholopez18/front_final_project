import React, { useState, useEffect } from "react";

import Navegationbar from "../../components/NavigationBar/Navegationbar";
import "./Search.css";
import { topTwenty, allSongs } from "../../../API/songs_API";
import SearchHeader from "./components/SearchHeader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Search() {
  const navigate = useNavigate();
  const [topSongs, setTopSongs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);
  const suggestions = searchResults.slice(0, 5);
  const showSearchResults = searchTerm && searchResults.length > 0;
  const headerTitle = !showSearch
    ? "Top 20s"
    : !searchTerm
    ? "Busquedas Recientes: "
    : "Resultados sugeridos";

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const storedSearch = JSON.parse(localStorage.getItem("recentSearch")); //recentSearch es identificador
    if (storedSearch) {
      setRecentSearch(storedSearch);
    }
  }, [showSearch]);

  const saveRecentSearchToLocalStorage = (searchData) => {
    localStorage.setItem("recentSearch", JSON.stringify(searchData));
  };

  const saveRecentSearch = (suggestion) => {
    if (recentSearch.length <= 4) {
      setRecentSearch([...recentSearch, suggestion]);
    } else {
      setRecentSearch([...recentSearch.slice(1, 5), suggestion]);
    }
    saveRecentSearchToLocalStorage(recentSearch);
  };

  const getTopTwenty = async () => {
    try {
      const result = await topTwenty(token);
      setTopSongs(result);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "orange",
        confirmButtonText: "Aceptar",
        customClass: {
          title: "font-small",
          text: "font-small",
        },
      });
    }
  };
  const getAllSongs = async () => {
    try {
      const allSongsDb = await allSongs(token);
      setSongs(allSongsDb);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "orange",
        confirmButtonText: "Aceptar",
        customClass: {
          title: "font-small",
          text: "font-small",
        },
      });
    }
  };

  useEffect(() => {
    getTopTwenty();
    getAllSongs();
  }, []);

  useEffect(() => {
    const searchFilter = searchTerm.toLowerCase();
    if (!searchFilter || songs.length === 0) {
      return;
    }

    const results = songs.filter(
      (n) =>
        n.name.toLowerCase().includes(searchFilter) ||
        n.artist.toLowerCase().includes(searchFilter)
    );
    setSearchResults(results);
  }, [searchTerm, songs]);

  const searchSong = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const clearInput = () => {
    setSearchTerm("");
  };

  let content1;
  let content = () => (
    <div className="topTwentyRender">
      <div className="songsTopTwenty">
        {topSongs.map(({ artist_id, artist, name, song_id }) => (
          <div className="topTwentyRenderSong" key={song_id + "top20"}>
            <img src={`/${artist_id}.png`} className="topTwImg" />
            <p className="topTwName">{name}</p>
            <p className="topTwArtist">{artist}</p>
          </div>
        ))}
      </div>
      <Navegationbar
        icon1="/style=outline, state=inactive.svg"
        icon2="/vector copy.svg"
        icon3="/style=outline, state=inactive, add-friend=false.svg"
        icon4="/style=outline, state=inactive (2).svg"
      />
    </div>
  );
  if (showSearch) {
    content1 = () => (
      <div className="searchResultsContainer">
        {!searchTerm ? (
          <>
            {recentSearch?.map(({ artist_id, artist, name, song_id }) => (
              <div className="suggestionItem" key={song_id + "recent-search"}>
                <img src={`/${artist_id}.png`} className="topTwImg" />
                <div>
                  <p className="topTwName">{name}</p>
                  <p className="topTwArtist">{artist}</p>
                </div>
                <img src="/cross.svg" className="deleteSearchImg" />
              </div>
            ))}
          </>
        ) : (
          showSearchResults && (
            <div className="recentSearchList">
              {suggestions.map((suggestion) => (
                <button
                  className="recentSearchSuggestion"
                  key={suggestion.song_id + "suggestion"}
                  onClick={() => {
                    saveRecentSearch(suggestion);
                  }}
                >
                  <img
                    src={`/${suggestion.artist_id}.png`}
                    className="topTwImg"
                  />
                  <div>
                    <p className="topTwName">{suggestion.name}</p>
                    <p className="topTwArtist">{suggestion.artist}</p>
                  </div>
                </button>
              ))}
            </div>
          )
        )}
      </div>
    );
  }

  return (
    <>
      <div className="searchContainer">
        <SearchHeader
          onDiscardSearch={() => {
            setShowSearch(false);
            clearInput();
          }}
          onSearchChange={(e) => searchSong(e)}
          onSearchFocus={() => setShowSearch(true)}
          showSearch={showSearch}
          searchTerm={searchTerm}
          title={headerTitle}
        />
        {showSearch && content1()}
        {!showSearch && content()}
      </div>
    </>
  );
}

export default Search;
