import Header from "../../components/Header/Header";
import InputUser from "../../components/Input/InputUser";
import InputPassword from "../../components/Input/InputPassword";
import "./accountCreate.css";
import MainBtn from "../../components/Buttons/MainBtn";
import { useState, useEffect } from "react";
import { userData, usernameVerify } from "../../../API/userData_API";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

function AccountCreate() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [userError, setUserError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [userInvalid, setUserInvalid] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [buttonStyle, setbuttonStyle] = useState(false);
  const [check, setCheck] = useState("");
  const [checkError, setCheckError] = useState(false);
  const [checked, setChecked] = useState(false);

  localStorage.clear();

  const handleUser = async (e) => {
    const value = e.target.value;
    setUser(value);
    if (value.trim().length === 0) {
      setUserError(true);
    } else {
      setUserError(false);
    }
  };

  const verifyUser = async () => {
    const validUser = user;
    console.log("Verifying user");
    try {
      await usernameVerify(validUser);
      setUserInvalid(false);
      setUserMessage("El nombre de usuario está disponible.");
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
      setUserInvalid(true);
      setUserMessage("El usuario ya existe.");
    }
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.trim().length === 0 || !isValidPassword(value)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleCheck = (e) => {
    setChecked(!checked);
    const value = e.target.value;
    setCheck(value);
    if (value !== checked) {
      setCheckError(true);
    } else {
      setCheckError(false);
    }
  };

 
  const isValidPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/.test(password);
  };

  const validationButton = () => {
    if (
      userInvalid ||
      userError ||
      passwordError ||
      password.trim() === "" ||
      !checked
    ) {
      setbuttonStyle(true);
    } else {
      setbuttonStyle(false);
    }
  };

  useEffect(() => {
    validationButton();
  }),
    [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = sessionStorage.getItem("mail");
    const dataToSend = { username: user, password: password, email: email };

    if (
      (
        userError ||
        email.trim() === "" ||
        passwordError ||
        password.trim() === "") &&
      checkError
    ) {
      alert("complete correctamente los campos");
    } else {
      try {
        await userData(dataToSend);
        navigate("/login");
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error', 
          confirmButtonColor: 'orange',
          confirmButtonText: 'Aceptar',
          customClass: {
            title: 'font-small', 
            text: 'font-small'   
          },
        });
      }
    }
  };

  return (
    <div className="accountCreateContainer">
      <main>
        <div>
          <Header title="Crear Cuenta"></Header>
        </div>
        <div className="mail">
          <h2>
            Ingresa un nombre de <br />
            usuario y contraseña.
          </h2>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <div className="inputMailType">
            <div className="inputDivMail">
              <label>Nombre de Usuario</label>
              <div className="inputMail">
                {userInvalid === true ? (
                  <InputUser
                    style={{ border: "2px solid #ea0f0f" }}
                    value={user}
                    onChange={handleUser}
                    onBlur={verifyUser}
                    warning="Deberá contener al menos 8 caracteres."
                  ></InputUser>
                ) : (
                  <InputUser
                    value={user}
                    onChange={handleUser}
                    onBlur={verifyUser}
                    warning="Deberá contener al menos 8 caracteres."
                  ></InputUser>
                )}
              </div>
              {userMessage && (
                <p
                  style={{ marginTop: "12px" }}
                  className={userInvalid ? "busy" : "available"}
                >
                  {userMessage}
                </p>
              )}
            </div>
            <div>
            <label style={{ color: passwordError ? "red" : "black" }}>
              Contraseña
            </label>

              <div className="inputMail">
                <InputPassword
                  value={password}
                  onChange={handlePassword}
                  warning="Deberá contener al menos 8 caracteres, una mayuscula, un numero y un caracter."
                ></InputPassword>
              </div>
            </div>
            <div className="termsAndConditions">
              <input
                onChange={handleCheck}
                value={check}
                className="inputCheck"
                type="checkbox"
                checked={checked}
              />
              <p htmlFor="">
                He leído y acepto los <a href="">Términos</a> y{" "}
                <a href="">Condiciones.</a>
              </p>
            </div>
          </div>

          <div className="containerBtn">
            <MainBtn
              disabled={buttonStyle}
              className={!buttonStyle ? "btnMain3" : "disabledBottom2"}
              type="submit"
              text="Continuar"
            />
          </div>
        </form>
      </main>
    </div>
  );
}

export default AccountCreate;
