import "./input.css";

function InputEmail(props) {
  return (
    <div className="paragraphMail">
      <input
        className="inputStyle"
        onFocus={props.onFocus}
        type={props.type}
        value={props.value} // Asocia el valor con la prop 'value'
        onChange={props.onChange} // Asocia el controlador de eventos con la prop 'onChange'
      />
      <p className="hint">{props.warning}</p>
    </div>
  );
}

export default InputEmail;



