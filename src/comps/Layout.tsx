import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            {/* Navbar visas längst upp */}
            <Navbar />

            {/* Spacing för att ge plats under navbar */}
            <div style={{ paddingTop: "70px" }}>
                {/* Sidinnehåll renderas här */}
                <Outlet />
            </div>
        </>
    );
};

export default Layout;