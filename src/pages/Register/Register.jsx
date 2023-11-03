import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import InputEmail from "../../components/Input/InputEmail";
import MainBtn from "../../components/Buttons/MainBtn";
import "./register.css";
import { useState } from "react";
import { emailAdd } from "../../../API/rule_MAIL";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [intoInput, setIntoInput] = useState(false);

  localStorage.clear();

  const handleFocus = () => {
    setIntoInput(true); 
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value.trim().length === 0 || !isValidEmail(value)) {
      setErrorEmail(true);
    } else {
      setErrorEmail(false);
    }
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailValue = email;

    try {
      await emailAdd(emailValue);
      if (errorEmail || email.trim() === "") {
        alert("Campos Incorrectos");
      } else {
        sessionStorage.setItem("mail", email);
        navigate("/account-create", { replace: true });
      }
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

  return (
    <div className="registerBody">
      <header>
        <div>
          <Header title="Crear Cuenta"></Header>
        </div>
      </header>
      <main>
        <div className="mail">
          <h2>
            ¿Cuál es tu correo <br />
            electrónico?
          </h2>
        </div>

        <div className="inputMailType">
          <label>Correo electrónico</label>
          <div className="inputMail">
            <form onSubmit={handleSubmit}>
              <InputEmail
                className={`inputStyle ${intoInput ? "active" : "inactive"}`}
                onFocus={handleFocus}
                type="email"
                value={email}
                onChange={handleChangeEmail}
                warning="Deberás poder confirmarlo luego."
              />
              <MainBtn className={'btnEmail'} type="submit" text="Enviar" />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
