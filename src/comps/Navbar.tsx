
import {Link} from "react-router-dom";

function Navbar() {

    return (
        <nav className="navbar">
            <ul className="navbar__menu">
                <li className="navbar__item"><Link to="/">Home</Link></li>
                <li className="navbar__item"><Link to="/menu">Menu</Link></li>
                <li className="navbar__item"><Link to="/about">Vårt kaffe</Link></li>
                <li className="navbar__item"><Link to="/profile">Profil</Link></li>
                <li className="navbar__item"><Link to="/status">Orderstatus</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar
