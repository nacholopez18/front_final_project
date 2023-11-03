import React from "react";
import { Link } from "react-router-dom";
import "./EmptyPlaylist.css";

export default function EmptyPlaylis() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="EmptyPlaylistContainer">
      <div className="settingsTitle">
        <Link to="/Profile">
          <img src="/left-icon-placeholder.svg" />
        </Link>
        <h3>{playlistName}</h3>
        <img src="/threepoints.svg" />
      </div>
    </div>
  );
}
