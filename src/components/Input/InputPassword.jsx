import "./input.css";
import { useState } from "react";

function InputPassword(props) {
  const [value, setValue] = useState("");
  const [cssClass, setCssClass] = useState("inactive");
  const [typeText, setTypeText] = useState("password");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
  
    if (newValue.length < 8 || !/^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(newValue)) {
      setCssClass("error");
    } else {
      setCssClass("inactive");
    }
  
    if (props.onChange) {
      props.onChange(e);
    }
  };
  

  const handleType = (e) => {
    setTypeText(typeText === "password" ? "text" : "password");

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div>
      <div className="passwordInputConatiner">
        <input
          value={props.value || value}
          onChange={handleChange}
          className={`${cssClass} inputStyle`}
          type={typeText}
        />
        {typeText === "password" ? (
          <img
            onClick={handleType}
            className="eyeImage"
            style={props.style}
            src="/icon/eye.svg"
            alt=""
          />
        ) : (
          <img
            onClick={handleType}
            className="eyeImage"
            style={props.style}
            src="/icon/eye_text.svg"
            alt=""
          />
        )}
      </div>
      {cssClass === "error" ? (
        <p style={{ color: "red" }} className="hint">
          {props.warning}
        </p>
      ) : (
        <p className="hint">{props.warning}</p>
      )}
    </div>
  );
}

export default InputPassword;
