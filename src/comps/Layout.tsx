import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { MenuItem } from "../interface/api.ts";

// Definerar props för Layout-komponenten
interface LayoutProps {
  orderItems: MenuItem[]; // Lista över varor i varukorgen
  setOrderItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; // Funktion för att uppdatera varukorgen
}

// Layout-funktionen tar emot orderItems och setOrderItems som props
const Layout = ({ orderItems, setOrderItems }: LayoutProps) => {
  return (
    <>
      {/* Navbar visas längst upp & får tillgång till orderitems & setOrderItems */}
      <Navbar orderItems={orderItems} setOrderItems={setOrderItems} />

      {/* Spacing för att ge plats under navbar */}
      <div style={{ paddingTop: "70px" }}>
        {/* Sidinnehåll renderas här */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
