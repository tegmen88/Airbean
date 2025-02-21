
import '../scss/_startpage.scss';
import { Link } from 'react-router-dom'; // Importera Link från react-router-dom

function Startpage() {

    return (
        <>
            <div className="startpage">

                <img src="/flower.svg" alt="Flower" className="flower left" />

                <img src="/loggo.svg" alt="Air Bean logo" className="logo" />
                <Link to="/menu" className="link">
                    <h1 >Air Bean</h1>
                </Link>
                <Link to="/menu" className="link">
                    <h3 >DRONEDELIVIERED COFFE</h3>
                </Link>

                <img src="/loggo.svg" alt="Flower" className="flower right" />

            </div>
        </>
    )
}

export default Startpage
