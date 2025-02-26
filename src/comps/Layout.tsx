import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { MenuItem } from "../interface/api.ts";

interface LayoutProps {
  orderItems: MenuItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

const Layout = ({ orderItems, setOrderItems }: LayoutProps) => {
  return (
    <>
      {/* Navbar visas längst upp */}
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
