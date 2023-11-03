import React, { useState, useEffect } from "react";
import Navegationbar from "../../components/NavigationBar/Navegationbar";
import "./Profile.css";
import { getUserPlaylists } from "../../../API/userData_API";
import HeaderProfile from "./components/HeaderProfile";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Profile() {
  const [users, setUsers] = useState({ username: "", playlistNames: [] });
  const navigate = useNavigate()

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const getUsersData = async () => {
    try {
      const userData = await getUserPlaylists(token);
      setUsers(userData);
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
    getUsersData();
  }, []);

  return (
    <div className="profileContainer">
      <HeaderProfile profileImg="/1.png" profileUsername={users.username} />
      <div className="dividerProfile">
        <label className="labelProfile">Mis Playlist</label>
        <hr />
        <Link to="/newPlaylist">
          <button className="dividerNewPlaylistDivider">Crear Playlist</button>
        </Link>
      </div>

      <div className="playlistProfileContainer">
        {users.playlistNames.map((playlistName, index) => (
          <div key={index} className="coverSectionProfile">
            <p>{playlistName}</p>
            <img className="coverStyles" src="/public/1.png" alt="" />
          </div>
        ))}
      </div>

      <Navegationbar
        icon1="/style=outline, state=inactive.svg"
        icon2="/style=outline, state=inactive (1).svg"
        icon3="/user.svg"
        icon4="/style=outline, state=inactive (2).svg"
      />
    </div>
  );
}

export default Profile;
