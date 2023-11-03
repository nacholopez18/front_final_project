import { Link } from "react-router-dom";
import "./header.css";

function Header(props) {
  return (
    <div>
      <div className="accountCreate">
        <div className="accountCreateChildTwo">
          <Link to={-1}>
            <img className={`"arrowImg" ${props.className}`} src="/icon/Vector.svg" alt="" />
          </Link>

          <h3>{props.title}   </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
