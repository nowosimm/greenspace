import { Carousel } from "@mantine/carousel";
import {
  Text,
  Paper,
  rem,
  Pill,
  useMantineTheme,
  JsonInput,
} from "@mantine/core";
import classes from "../css/CardsCarousel.module.css";
import "@mantine/carousel/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faSprayCanSparkles,
  faPlantWilt,
  faSeedling,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IconSettings } from "@tabler/icons-react";

import current from "./images/current.jpeg";
import old from "./images/old.jpeg";

const waterIcon = <FontAwesomeIcon icon={faDroplet} />;
const humidityIcon = <FontAwesomeIcon icon={faSprayCanSparkles} />;
const fertilizeIcon = <FontAwesomeIcon icon={faPlantWilt} />;
const repottingIcon = <FontAwesomeIcon icon={faSeedling} />;
const sunlightIcon = <FontAwesomeIcon icon={faSun} />;

function Cards({ image, category }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
      </div>
    </Paper>
  );
}

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "04.11.21",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "12.10.23",
  },
  {
    image:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "03.11.19",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "09.28.20",
  },
  {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "01-12-24",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    category: "10-18-24",
  },
];

export default function () {
  let { plantId } = useParams();
  const [plant, setPlant] = useState({});
  const [value, setValue] = useState();
  useEffect(() => {
    const callServer = async () => {
      let response = await (
        await fetch("http://localhost:3000/" + plantId)
      ).json();
      setPlant(response);
      console.log(response);
    };
    callServer();
  }, [plantId]);

  return (
    <div className="font-body">
      <div className="grid grid-cols-2">
        <div>
          <Carousel withIndicators>
            <Carousel.Slide>
              <img src={current}></img>
            </Carousel.Slide>
            <Carousel.Slide>
              <img src={old}></img>
            </Carousel.Slide>
            <Carousel.Slide>
              <img src={current}></img>
            </Carousel.Slide>
          </Carousel>
        </div>

        <div className="mx-8 grid grid-rows-2">
          <div className="flex flex-col justify-around">
            <div className="font-decorative text-2xl pb-4 text-coolBlack">
              {plant.type}
            </div>
            <div className="m-3">
              {sunlightIcon} I need {plant.sunlight} sunlight
            </div>
            <div className="m-3">
              {waterIcon} I need watered when {plant.water} of my soil is dry
            </div>
            <div className="m-3">
              {humidityIcon} I need {plant.humidity} humidity
            </div>
          </div>
          <div className=" object-fill	">
            <JsonInput
              type="text"
              label="Note Pad"
              placeholder="Enter any notes here"
              formatOnBlur
              autosize
              minRows={4}
              value={value}
              onChange={(e) => setData(e.target.value)}
              // maxRows={10}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Pill size="lg" className="m-2">
          {waterIcon} 6 days until next water
        </Pill>
        <Pill size="lg" className="m-2">
          {humidityIcon} 5 days until next misting
        </Pill>
        <Pill size="lg" className="m-2">
          {fertilizeIcon} fertilized 23 days ago
        </Pill>
        <Pill size="lg" className="m-2">
          {repottingIcon} Re-potted 67 days ago
        </Pill>
      </div>
    </div>
  );
}
