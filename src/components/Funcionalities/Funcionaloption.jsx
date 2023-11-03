import React, { useState } from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import "./Funcionaloption.css";

function Funcionaloption(props) {
  return (
    <>
      <div onClick={props.onClick} className="optionContainer">
        <img src={props.image} />
        <div className="optionInsideInfo">
          <h2>{props.title}</h2>
          <p>{props.text}</p>
        </div>
      </div>
    </>
  );
}

export default Funcionaloption;
