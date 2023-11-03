import React, { useEffect, useState } from "react";
import "./NewPlaylist.css";
import { Link } from "react-router-dom";

function NewPlaylist() {
  const [playlistName, setPlaylistName] = useState("");
  const newPlaylist = (e) => {
    const inputValue = e.target.value;
    setPlaylistName(inputValue);
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="newPlContainer">
      <div className="settingsTitle">
        <Link to="/Profile">
          <img src="/left-icon-placeholder.svg" />
        </Link>
        <h3>Crear Playlist</h3>
      </div>
      <div className="playlistName">
        <p className="playlistNameTitle">¿Cómo se llamará tu playlist?</p>
        <label>Nombre de la Playlist:</label>
        <input
          type="text"
          value={playlistName}
          className="playlistNameInput"
          onChange={newPlaylist}
        />
      </div>
      <button className="playlistNameBtn" disabled={!playlistName}>
        Continuar
      </button>
    </div>
  );
}

export default NewPlaylist;
