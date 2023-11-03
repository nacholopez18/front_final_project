import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./Navegationbar.css";

function Navegationbar(props) {
  return (
    <>
      <div className="navegationContainer">
        <Link to="/home">
          <button className="homeBtn">
            <img src={props.icon1} />
            <p>Inicio</p>
          </button>
        </Link>
        <Link to="/search">
          <button className="searchBtn">
            <img src={props.icon2} />
            <p>Buscador</p>
          </button>
        </Link>
        <Link to="/Profile">
          <button className="profileBtn">
            <img src={props.icon3} />
            <p>Perfil</p>
          </button>
        </Link>
        <button className="friendsBtn">
          <img src={props.icon4} />
          <p>Amigos</p>
        </button>
      </div>
    </>
  );
}

export default Navegationbar;
