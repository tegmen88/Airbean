
import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import '../scss/_navbar.scss';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    return (
        <>
            {/* Navigationsikon (hamburgare) */}
            <div className="menu-icon" onClick={toggleMenu}>
                {!menuOpen ? <MenuIcon /> : <CloseIcon />}
            </div>

            {/* Meny-overlay när den är öppen */}
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

            {/* Varukorgsikon till höger */}
            <div className="cart-icon" onClick={toggleCart}>
                {!cartOpen ? <ShoppingCartIcon/> : <CloseIcon />}
            </div>
        </>
    );
}

export default Navbar;
