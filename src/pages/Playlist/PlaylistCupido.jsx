import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Navegationbar from "../../components/NavigationBar/Navegationbar";
import "./Playlist.css";
import { actualPlaylist } from "../../../API/rule_PLAYLIST";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const PlaylistCupido= () => {
    const navigate = useNavigate()
    const [playlist, setPlaylist] = useState([]);
    const [totalDurationMusic, setTotalDurationMusic] = useState(null);
  
    const token = localStorage.getItem('token')

    if(!token){
      navigate('/')
    }

    const getPlaylist = async () => {
      try {
        const createPlaylist = await actualPlaylist(token);
        setPlaylist(createPlaylist);
        mapPlaylist(createPlaylist);
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
  
    const mapPlaylist = (playlist) => {
      let totalDuration = 0;
  
      playlist.forEach((data) => {
        totalDuration += Number(data.duration);
      });
  
      const hours = Math.floor(totalDuration);
      const minutes = Math.round((totalDuration - hours) * 60);
  
      const fullMinutes = hours;
      const fullHours = fullMinutes / 60;
  
      setTotalDurationMusic(
        Math.floor(fullHours) + "h " + (minutes < 10 ? "0" : "") + minutes + "m"
      );
    };
  
    useEffect(() => {
      getPlaylist();
    }, []);

  return (
    <>
      <div className="mainContainer">
        <h3 className="">Generada Del Cupido Musical</h3>
        <Header title="Playlist Generada" />
        <Navegationbar
          icon1="/style=fill, state=active.svg"
          icon2="/style=outline, state=inactive (1).svg"
          icon3="/style=outline, state=inactive, add-friend=false.svg"
          icon4="/style=outline, state=inactive (2).svg"
        />
        <div className="coverSection">
          <img className="coverStyles" src="/public/1.png" alt="" />
          <img className="coverStyles" src="/public/14.png" alt="" />
          <img className="coverRaw" src="/public/8.png" alt="" />
          <img className="coverStyles" src="/public/2.png" alt="" />
        </div>

        <div className="logoDiv">
          <img className="logoSmall" src="/public/logo-small.svg" alt="" />
          <img className="verifiedStyle" src="/public/verified.svg" alt="" />
          <img className="shareStyle" src="/public/share.svg" alt="" />

          <h2 className="time">{totalDurationMusic}</h2>
          <img className="vectorStyle" src="/public/vector.svg" alt="" />
        </div>
        <div className="logoDiv">
          <img className="makeCopy" src="/public/copy.svg" alt="" />
          <h2 className="copyText">Crear Copia</h2>
          <img className="shuffle" src="/public/shuffle.svg" alt="" />
          <img className="playButton" src="/public/play-btn.svg" alt="" />
        </div>
        <div className="containerMap">
          {playlist.map((data) => (
            <div key={data.id_song} className="card">
              <div className="cardStyle">
                <div>
                  <img
                    className="songImage"
                    src={`/${data.id_song}.png`}
                    alt=""
                  />

                  <div
                    className="infoMusic"
                    style={{ flexDirection: "column", textAlign: "center" }}
                  >
                    <p className="songName" key={data.id}>{data.name}</p>
                    <p className="artistName" key={data.id}>{data.artist_name}</p>
                  </div>

                  <img
                    className="iconRight"
                    src="/icon/icon-right-placeholder.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlaylistCupido;
