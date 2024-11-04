import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Gallery.css";

export default function () {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const callServer = async () => {
      let response = await (
        await fetch("http://localhost:3000/", {
          credentials: "include",
        })
      ).json();
      setPlants(response);
    };
    callServer();
  }, []);

  const gallery = [];
  for (let i = 0; i < plants.length; i++) {
    var plant = plants[i];
    if (plant.pictures.length > 0) {
      plant.pictures.map((pic) => {
        gallery.push({
          _id: plant._id,
          src: `http://localhost:3000/plant/${plant._id}/picture/${pic}`,
          type: plant.type,
        });
      });

    }
  }
  return (
    <div className="font-body">
        <div className="grid grid-cols-3 gap-5 border-5 m-5">
          {gallery.map((p) => (
            <Link to={`/plant/${p._id}`} className="background">
              <div  className="container">
                <img src={p.src} className="image" />
                <div className="middle">
                  <div className="text">{p.type}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}
