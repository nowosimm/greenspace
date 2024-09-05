import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faDroplet, faSprayCanSparkles, faPlantWilt, faSeedling } from '@fortawesome/free-solid-svg-icons'

const sunlightIcon = <FontAwesomeIcon icon={faSun} />
const waterIcon = <FontAwesomeIcon icon={faDroplet} />
const humidityIcon = <FontAwesomeIcon icon={faSprayCanSparkles} />
const fertilizeIcon = <FontAwesomeIcon icon={faPlantWilt} />

export default function () {
    const [plants, setPlants] = useState([]);
    useEffect(() => {
        const callServer = async () => {
            let response = await (await fetch("http://localhost:3000/", {
                credentials: "include",
              })).json();
            setPlants(response)
        }
        callServer();
    }, []);

    return (
        <div className='flex flex-col justify-center'>
            <div className="flex font-decorative text-lime-900 text-7xl justify-center">Green Space</div>
            <div className='flex flex-col font-body max-w-screen-md m-auto justify-center' >
                <div className="flex mx-6 mt-14 justify-center">

                    <div className="bg-slate-50 rounded-lg grow m-4 p-6 pt-3">
                        <div className='font-semibold' >Water needs</div>
                        <div className="px-4 pt-1 leading-loose">
                            {plants.map(p => (<div key={p._id}>{waterIcon} {p.type}</div>))}
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg grow m-4 p-6 pt-3">
                        <div className='font-semibold'>Humidity needs</div>
                        <div className="px-4 pt-1 leading-loose">
                            <div>{humidityIcon} Bonsai Tree</div>
                            <div>{humidityIcon} Pin-Stripe Calethea</div>
                            <div>{humidityIcon} Pepperomia Hope</div>
                        </div>
                    </div>
                </div>

                <div className='flex-col flex justify-between mx-6'>

                    <div className="bg-slate-50 rounded-lg grow m-4 p-6 pt-3">
                        <div className='font-semibold'>Reminders</div>
                        <div className="px-4 pt-1 leading-loose">
                            <div>{fertilizeIcon} 3 plants need fertiziling this month</div>
                            <div>{sunlightIcon} 2 plants need rotated next water</div>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-lg grow m-4 p-6 pt-3">
                        <div className='font-semibold'>Tomorrow</div>
                        <div className="px-4 pt-1 leading-loose">
                            <div>{waterIcon} 0 plants due for watering</div>
                            <div>{humidityIcon} 5 plants due for misting</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}