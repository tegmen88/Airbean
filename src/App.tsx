import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Startpage from "./comps/Startpage.tsx";
import About from "./comps/About.tsx";
import StatusPage from "./comps/StatusPage.tsx";
import Navbar from "./comps/Navbar.tsx";
import Menupage from "./comps/Menupage.tsx";
import { MenuItem } from "./interface/api.ts";

function App() {
  const [orderItems, setOrderItems] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setOrderItems((prevItems) => [...prevItems, item]);
  };

  return (
    <BrowserRouter>
      <Navbar orderItems={orderItems} setOrderItems={setOrderItems} />
      <Routes>
        <Route path="/" element={<Startpage />} />
        <Route path="/menu" element={<Menupage addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="*" element={<Startpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
