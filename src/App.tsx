
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Startpage from "./comps/Startpage.tsx";
import About from "./comps/About.tsx";
import Status from "./comps/Status.tsx";
import Navbar from "./comps/Navbar.tsx";
import Menupage from "./comps/Menupage.tsx";
import ProfileAcount from "./comps/ProfileAccount.tsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Startpage />} />
          <Route path="/menu" element={<Menupage />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<ProfileAcount />} />
          <Route path="/status" element={<Status />} />

          <Route path="*" element={<Startpage />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
