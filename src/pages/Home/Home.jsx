import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Funcionaloption from "../../components/Funcionalities/Funcionaloption";
import Navegationbar from "../../components/NavigationBar/Navegationbar";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const routerCupido = () =>{
    navigate("/musicalcupido")
  }
  const routerContextual = () =>{
    navigate("/ContextualMusic")
  }

  return (
    <>
      <div className="homeContainer">
        <div className="homeTitle">
          <h1>Música ya</h1>
          <div className="homeTitleImg">
            <img src="/Vector.svg" />
            <img src="/style=outline, state=active, notification=true.svg" />
          </div>
        </div>
        <div className="homeOptions">
          <Funcionaloption
            onClick={routerCupido}
            image="/animation-step=6.svg"
            title="Cupido Musical"
            text="Tus artistas favoritos nunca van a dejarte con el corazón roto."
          />

          <Funcionaloption
            onClick={routerContextual}
            image="/animation-step=5.svg"
            title="Música Contextual"
            text="Creamos la playlist perfecta para cualquier situación"
          />
        </div>
        <Navegationbar
          icon1="/style=fill, state=active.svg"
          icon2="/style=outline, state=inactive (1).svg"
          icon3="/style=outline, state=inactive, add-friend=false.svg"
          icon4="/style=outline, state=inactive (2).svg"
        />
      </div>
    </>
  );
}

export default Home;
