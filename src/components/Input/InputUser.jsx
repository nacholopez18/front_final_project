import "./input.css";
import { useState } from "react";

function InputUser(props) {

  const [intoInput, setIntoInput] = useState(false);

  const handleFocus = () => {
    setIntoInput(true); 
  };

  const handleBlur = (e) => {
    setIntoInput(false); 
    if (props.onBlur) {
      props.onBlur(e);
    }
  };


  return (
    <div>
      <input
        style={props.style}
        value={props.value}
        onChange={props.onChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={`inputStyle ${intoInput ? "active" : "inactive"}`}
        type={props.type}
      />
    </div>
  );
}

export default InputUser;
