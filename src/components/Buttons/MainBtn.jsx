import React from "react";
import "./MainBtnStyle.css";

export const MainBtn = (props) => {

  return (
    <>

      <button disabled={props.disabled}  type={props.type} className={` ${props.className} btnMain`}>
        {props.text}
      </button>

    </>
  );
};

export default MainBtn;
