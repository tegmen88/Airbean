
import {Link} from "react-router-dom";
import {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import '../scss/_navbar.scss';

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="menu-icon" onClick={toggleMenu}>
                {!menuOpen ? <MenuIcon /> : <CloseIcon />}
            </div>

            {menuOpen && (
                <div className="overlay" onClick={toggleMenu}>
                    <nav className="navbar">
                        <ul className="navbar__menu">
                            <li className="navbar__item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="navbar__item">
                                <Link to="/menu">Menu</Link>
                            </li>
                            <li className="navbar__item">
                                <Link to="/about">Vårt kaffe</Link>
                            </li>
                            <li className="navbar__item">
                                <Link to="/status">Orderstatus</Link>
                            </li>
                        </ul>
                    </nav>
                </div>

            )}
        </>
    )
}

export default Navbar
