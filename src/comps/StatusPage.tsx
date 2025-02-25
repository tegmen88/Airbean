
import '../scss/_statuspage.scss';


function StatusPage() {


    return (
        <>

            <div className='statuspage'>

                <p>Ordernummer</p>

                <img src="/drone.svg" alt="drone" className="drone-img" />


                <h2>Din beställning är på väg</h2>

                <p>antal: minuter</p>

                <button>Ok cool!</button>
            </div>

        </>
    )
}

export default StatusPage
