import { Link, useRouteError } from "react-router-dom";
import MainBtn from "../../components/Buttons/MainBtn";
import './errorpage.css'
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <div className="titleError">
                <h1>Oops!</h1>
            </div>
            <div className="textError">
                <p>No exsite el contenido al que quiere ingresar</p>
            </div>
            <div className="imgError">
                <img src="/disco.jpg" alt="" />
            </div>
            <div className="errorStatus">
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
            <div className="errorExit">
                <img className="arrowImg" src="/icon/Vector.svg" alt="" />
                <Link to="/home"><a className="btnError"> Regresar a inicio</a></Link>
            </div>
        </div>
    );
}