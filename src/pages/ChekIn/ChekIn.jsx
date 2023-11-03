import "./ChekIn.css";
import MainButton from "../../components/Buttons/MainBtn";  
import CustomBtn from "../../components/Buttons/CustomBtn";
import { Link } from 'react-router-dom';

export const ChekIn = () => {
  localStorage.clear();
  return (
    <>
    <main className="container" >
        <div className="flexContainer">
            <img src="/logo-large.svg" className="logoImage" />
            <h2 className="lettersMid">Música a medida.</h2>

            <div className="logInSection">
                <Link to={"/register"}>
                <MainButton text="Registrarse Gratis"> </MainButton></Link>
                <CustomBtn logo="google-logo.svg" text='Continuar con google'></CustomBtn>
                <CustomBtn logo="apple-logo.svg" text='Continuar con Apple'></CustomBtn>
                
               
            </div>
            <Link to={"/login"}>
                <button className="logIn">Iniciar Sesion</button></Link>
        </div>
    </main>
    </>
  );
};
export default ChekIn;
