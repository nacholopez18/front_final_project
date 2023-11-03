import React from "react";
import { Link } from "react-router-dom";
import MainBtn from "../../components/Buttons/MainBtn";
import "./Settings.css";

function Settings() {
  return (
    <div className="settingsContainer">
      <div className="settingsTitle">
        <Link to="/Profile">
          <img src="/left-icon-placeholder.svg" />
        </Link>
        <h3>Configuración</h3>
      </div>
      <div className="buttonsSection">
        <MainBtn text="Editar Apariencia" />
        <MainBtn text="Editar Perfil" className="editBtn" />
      </div>
      <div className="versionCloseSesion">
        <button className="logIn">Versión: V1.25.03</button>
        <hr />
        <button className="logIn">Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default Settings;
