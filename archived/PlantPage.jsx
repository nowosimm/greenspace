import { useState, useEffect } from 'react'
import {
    useParams
  } from "react-router-dom";
import current from "./images/current.jpeg"
import old from "./images/old.jpeg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faDroplet, faSprayCanSparkles, faPlantWilt, faSeedling } from '@fortawesome/free-solid-svg-icons'

const sunlightIcon = <FontAwesomeIcon icon={faSun} />
const waterIcon = <FontAwesomeIcon icon={faDroplet} />
const humidityIcon = <FontAwesomeIcon icon={faSprayCanSparkles} />
const fertilizeIcon = <FontAwesomeIcon icon={faPlantWilt} />
const repottingIcon = <FontAwesomeIcon icon={faSeedling} />

export default function () {

    let { plantId } = useParams();
    const [plant, setPlant] = useState({});
    useEffect(() => {
        const callServer = async () => {
            let response = await (await fetch("http://localhost:3000/"+plantId)).json();
            setPlant(response);
            console.log(response);
        }
        callServer();
    }, []);
    
    return (
        <div className=" font-body m-6">
            <div className="flex justify-center">
                <img className="max-w-2xl rounded-lg" src={current}></img>
                <div className="flex flex-col min-w-80 mx-14 justify-between">
                    <div className="font-decorative text-2xl mt-2">{plant.type}</div>
                    <div>{sunlightIcon} I need {plant.sunlight} sunlight</div>
                    <div>{waterIcon} I need watered when {plant.water} of my soil is dry</div>
                    <div>{humidityIcon} I need {plant.humidity} humidity</div>
                    <img className="flex max-w-sm rounded-lg" src={old}></img>
                </div>
            </div>
            <div className="flex my-10 justify-center">
                <div className="flex bg-slate-100 rounded-lg justify-center p-2 m-2">
                    <div className="pr-4">{waterIcon} Last Watering</div>
                    <button>4.15.2024</button>
                </div>
                <div className="flex bg-slate-100 rounded-lg justify-center p-2 m-2">
                    <div className="pr-4">{humidityIcon} Last Misting</div>
                    <button>4.15.2024</button>
                </div>
                <div className="flex bg-slate-100 rounded-lg justify-center p-2 m-2">
                    <div className="pr-4">{repottingIcon} Last Repotting</div>
                    <button>3.12.2023</button>
                </div>
                <div className="flex bg-slate-100 rounded-lg justify-center p-2 m-2">
                    <div className="pr-4">{fertilizeIcon} Last Fertilizing</div>
                    <button>4.12.2024</button>
                </div>
            </div>
            <div>{plant.notes}</div>

        </div>

    )
}