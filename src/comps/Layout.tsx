import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { MenuItem } from "../interface/api.ts";

interface LayoutProps {
  orderItems: MenuItem[];
}

const Layout = ({ orderItems }: LayoutProps) => {
  return (
    <>
      {/* Navbar visas längst upp */}
      <Navbar orderItems={orderItems} />

      {/* Spacing för att ge plats under navbar */}
      <div style={{ paddingTop: "70px" }}>
        {/* Sidinnehåll renderas här */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
