import React from "react";
import MainButton from "../../components/Buttons/MainBtn";
import { Link, useNavigate } from "react-router-dom";
import "./ContextualMusicStyles.css";
import Header from "../../components/Header/Header";
import { useState, useEffect } from "react";
import {
  allActivity,
  allGender,
  allMood,
  allWeather,
  contextualMusic,
} from "../../../API/cntxMusic_API";
import Swal from "sweetalert2";

const ContextualMusic = () => {
  const navigate = useNavigate();
  const [activity, setActivity] = useState([]);
  const [mood, setMood] = useState([]);
  const [weather, setWeather] = useState([]);
  const [gender, setGender] = useState([]);
  const [idActivity, setIdActivity] = useState("");
  const [idMood, setIdMood] = useState("");
  const [idGender, setIdGender] = useState([]);
  const [idWeather, setIdWeather] = useState("");
  const token = localStorage.getItem("token");
  const [totalContainerHidden, setTotalContainerHidden] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleContainer = () => {
    setTotalContainerHidden(!totalContainerHidden);
  };

  const getActivity = async () => {
    try {
      const result = await allActivity(token);
      setActivity(result);
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
  const getMood = async () => {
    try {
      const result = await allMood(token);
      setMood(result);
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
  const getWeather = async () => {
    try {
      const result = await allWeather(token);
      setWeather(result);
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
  const getGender = async () => {
    try {
      const result = await allGender(token);
      setGender(
        result.map((gender) => {
          return { ...gender, status: false };
        })
      );
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
    backgroundColor: "black",
  };

  const toggleGender = (index) => {
    const newState = [...gender];
    const currentSatus = gender[index].status;
    if (!currentSatus) {
      const activeCount = gender.filter((c) => c.status).length;

      if (activeCount < 3) {
        newState[index].status = !currentSatus;
        inputPasswordStyles;
      } else {
        alert("selecciones maximo 3");
      }
    } else {
      newState[index].status = !currentSatus;
    }
    const selectedGender = gender
      .filter((c) => {
        return c.status == true;
      })
      .map(({ id_gender }) => id_gender);
    setIdGender(selectedGender);
    setGender(newState);
  };

  const handleActivity = (e) => {
    setIdActivity(e.target.value);
  };

  const handleMood = (e) => {
    setIdMood(e.target.value);
  };

  const handleWeather = (e) => {
    setIdWeather(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      mood: +idMood,
      weather: +idWeather,
      activity: +idActivity,
      gender: idGender,
    };

    // console.log("Guardando en el LocalStorage:", dataToSend);
    localStorage.setItem("ContextualMusic", JSON.stringify(dataToSend));
    // console.log("Guardado en el LocalStorage exitosamente.");

    try {
      await contextualMusic(dataToSend, token);
      navigate("/Playlistcontextual");
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

  useEffect(() => {
    getMood();
    getActivity();
    getWeather();
    getGender();
  }, []);

  return (
    <>
      <main className="mainContainer">
        <div
          style={{
            display: totalContainerHidden ? "flex" : "none",
          }}
          className="popUp"
        >
          <div className="titlePopUp">
            <h3>Música Contextual</h3>
          </div>

          <div className="imgPopUp">
            <img src="/contextual-pop-up.svg" alt="" />
          </div>

          <div className="textPopUp">
            <p>
              Llena cuantos campos quieras y crearemos una playlist en base a
              tus respuestas.
            </p>
          </div>

          <div className="containerButtonPopUp">
            <button onClick={handleContainer} className="buttonOkPopUp">
              Entendido
            </button>
          </div>

          <div className="containerA">
            <a onClick={handleContainer} className="aNoPopUp">
              No volver a Mostrar
            </a>
          </div>
        </div>

        <div
          className="childContainer"
          style={{
            display: totalContainerHidden ? "none" : "flex",
          }}
        >
          <Header className="textHeader" title="Musica Contextual"></Header>

          <form onSubmit={handleSubmit} className="formLayout">
            <h1>¿Cúal es la ocasión?</h1>
            <select
              onChange={handleActivity}
              id="opciones"
              className="inputMain"
            >
              <option value="" disabled selected hidden>
                Actividad
              </option>
              {activity.map((n) => (
                <option
                  className="colorType"
                  key={n.id_activity}
                  value={n.id_activity}
                >
                  {n.type}
                </option>
              ))}
            </select>

            <h1>¿Cómo te sientes?</h1>

            <select onChange={handleMood} id="opciones" className="inputMain">
              <option value="" disabled selected hidden>
                Estado de Animo
              </option>
              {mood.map((n) => (
                <option className="colorType" key={n.id_mood} value={n.id_mood}>
                  {n.type}
                </option>
              ))}
            </select>

            <h1>¿Cómo esta el dia?</h1>
            <select
              onChange={handleWeather}
              id="opciones"
              className="inputMain"
            >
              <option value="" disabled selected hidden>
                Clima
              </option>
              {weather.map((n) => (
                <option
                  className="colorType"
                  key={n.id_weather}
                  value={n.id_weather}
                >
                  {n.type}
                </option>
              ))}
            </select>
            <h1>Selecciona hasta 3 géneros:</h1>

            <div className="containGender">
              {gender.map((n, i) => (
                <div key={n.id_gender}>
                  <label className="genderBox">
                    <input
                      className="checkClass"
                      onChange={() => toggleGender(i)}
                      type="checkbox"
                      name={n.type}
                      id={n.id_gender}
                      checked={n.status}
                      value={n.id_gender}
                    />
                    <span>{n.type}</span>
                  </label>
                </div>
              ))}
            </div>

            <MainButton
              className="buttonGender"
              type="submit"
              text="Crear Playlist"
            ></MainButton>
          </form>
        </div>
      </main>
    </>
  );
};

export default ContextualMusic;
