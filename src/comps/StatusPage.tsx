import '../scss/_statuspage.scss';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

function StatusPage() {
    const location = useLocation();
    const orderNr = location.state?.orderNr;
    const [timeLeft, setTimeLeft] = useState(15 * 60);

    // useEffect för att starta nedräkningen
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1; // Minska med 1 sekund
            });
        }, 1000);

        // Rensa intervallet när komponenten avmonteras
        return () => clearInterval(timer);
    }, []);

    // Konvertera tid i sekunder till minuter och sekunder
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`; // Format: mm:ss
    };

    return (
        <div className='statuspage'>
            {/* Visa ordernummer */}
            {orderNr ? (
                <>
                    <p>Ordernummer: {orderNr}</p>
                    <img src="/drone.svg" alt="drone" className="drone-img" />
                    <h2>Din beställning är på väg</h2>
                    <p>Leverans om: {formatTime(timeLeft)} minuter</p> {/* Timer */}
                    <button className='status-btn'>Ok cool!</button>
                </>
            ) : (
                <p>Inget ordernummer hittades. Gå tillbaka och lägg en beställning först.</p>
            )}
        </div>
    )
}

export default StatusPage
