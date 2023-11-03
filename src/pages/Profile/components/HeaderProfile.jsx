import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeaderProfile.css";

function HeaderProfile({
  profileImg,
  profileName,
  profileUsername,
  settingsPage,
}) {
  return (
    <>
      <div className="headerProfileContainer">
        <img src={profileImg} className="profileImg" />
        <Link to="/settings">
          <button className="SettingsBtn">
            <img src="gear.svg" className="SettingsImg" />
          </button>
        </Link>
      </div>
      <div className="profileName">
        <h3>{profileName}</h3>
        <p className="profileNameUsername">{profileUsername}</p>
      </div>
    </>
  );
}

export default HeaderProfile;
