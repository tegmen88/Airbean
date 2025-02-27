import { Link } from "react-router-dom";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../scss/_navbar.scss";
import Cart from "./Cart";
import { MenuItem } from "../interface/api";
import { Badge } from "@mui/material";

// Definierar props för Navbar-komponenten
interface NavbarProps {
  orderItems: MenuItem[]; // En lista med produkter i varukorgen
  setOrderItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; // Funktion för att uppdatera varukorgen
}

// tar emot orderItems och setOrderItems som props från App.tsx
function Navbar({ orderItems, setOrderItems }: NavbarProps) {
  // states för hantera menu och cart
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // funktion för toggla menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("menu Klick!", !menuOpen);
  };

  // funktion för toggla cart
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
            {/* Skickar ner props till cart */}
            <Cart orderItems={orderItems} setOrderItems={setOrderItems} />
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
