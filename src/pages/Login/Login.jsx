import Header from "../../components/Header/Header";
import InputPassword from "../../components/Input/InputPassword";
import InputUser from "../../components/Input/InputUser";
import MainBtn from "../../components/Buttons/MainBtn";
import "./login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  emailVerify,
  passwordVerify,
  usernameVerify,
} from "../../../API/rule_LOGIN";
import Swal from "sweetalert2";

function Login() {
  localStorage.clear();

  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [usernameAndMail, setUsernameAndMail] = useState("");
  const [errorUsernameAndMail, setErrorUsernameAndMail] = useState(false);
  const [buttonStyle, setbuttonStyle] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length === 0 || e.target.value.length < 8) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  const handleUsername = (e) => {
    setUsernameAndMail(e.target.value);

    if (e.target.value.length === 0) {
      setErrorUsernameAndMail(true);
    } else {
      setErrorUsernameAndMail(false);
    }
  };

  useEffect(() => {
    const buttonState = () => {
      if (
        errorPassword ||
        errorUsernameAndMail ||
        usernameAndMail.trim() === "" ||
        password.trim() === ""
      ) {
        setbuttonStyle(true);
      } else {
        setbuttonStyle(false);
      }
    };

    buttonState();
  }, [errorPassword, errorUsernameAndMail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailOrUserValue = usernameAndMail;
    const passwordValue = password;

    let emailValue;
    let usernameValue;

    try {
      if (emailOrUserValue.includes("@")) {
        emailValue = emailOrUserValue;
        await emailVerify(emailValue);
      } else {
        usernameValue = emailOrUserValue;
        await usernameVerify(usernameValue);
      }

      const user = {
        email: emailValue,
        password: passwordValue,
        username: usernameValue,
      };

      if (errorPassword || errorUsernameAndMail) {
        alert("Error");
      } else if ((emailValue || usernameValue) && passwordValue) {
        const result = await passwordVerify(user);
        localStorage.setItem("token", result.token);
        navigate("/home");
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

  const inputPasswordStyles = {
    position: "absolute",
    width: "24px",
    height: "24px",
    right: "10px",
    top: "25px",
  };

  return (
    <div className="registerBody">
      <main>
        <div>
          <Header className="head" title="Iniciar Sesion"></Header>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputMailType">
            <div className="loginUser">
              <div className="inputDivMail">
                <label>Nombre de Usuario o E-mail</label>
                <div className="inputMail">
                  <InputUser
                    type={usernameAndMail.includes("@") ? "email" : "text"}
                    value={usernameAndMail}
                    onChange={handleUsername}
                    warning="Deberás poder confirmarlo luego."
                  ></InputUser>
                </div>
              </div>
              <div>
                <label>Contraseña:</label>
                <div className="inputMail">
                  <InputPassword
                    onChange={handlePassword}
                    value={password}
                    style={inputPasswordStyles}
                  ></InputPassword>
                </div>
              </div>
            </div>
            <div className="containerButton">
              <MainBtn
                disabled={buttonStyle}
                className={!buttonStyle ? "btnMain4" : "disabledBottom4"}
                type="submit"
                text="Iniciar Sesión"
              />
              <p>¿Olvidaste tu contraseña?</p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Login;
