import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../scss/_navbar.scss";
import Cart from "./Cart";
import { MenuItem } from "../interface/api";
import {Badge} from "@mui/material";

interface NavbarProps {
  orderItems: MenuItem[];
}

function Navbar({ orderItems }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("menu Klick!", !menuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
    console.log("cart Klick!", !cartOpen);
  };

    // Funktion som räknar antalet produkter
    const getTotalItems = () => {
        return orderItems.length;
    };


    return (
    <>
      {/* Navigationsikon (hamburgare) */}
      <div className="menu-icon" onClick={toggleMenu}>
        {!menuOpen ? <MenuIcon /> : <CloseIcon />}
      </div>

      {/* Meny-overlay när den är öppen */}
      {menuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}>
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
{/*      <div className="cart-icon" onClick={toggleCart}>
        {!cartOpen ? <ShoppingCartIcon /> : <CloseIcon />}
      </div>*/}

        <div className="cart-icon" onClick={toggleCart}>
            {!cartOpen ? (
                <Badge badgeContent={getTotalItems()} color="warning">
                    <ShoppingCartIcon />
                </Badge>
            ) : (
                <CloseIcon />
            )}
        </div>

        {/* Varukorgen-overlay när den är öppen */}
      {cartOpen && (
        <div className="cart-overlay" onClick={toggleCart}>
          <div className="cart">
            <Cart orderItems={orderItems} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;