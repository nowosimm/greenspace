import { useMediaQuery } from "@mantine/hooks";
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
  useEffect(() => {
    const callServer = async () => {
      let response = await (
        await fetch("http://localhost:3000/" + plantId)
      ).json();
      setPlant(response);
      console.log(response);
    };
    callServer();
  }, []);

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Cards {...item} />
    </Carousel.Slide>
  ));

  return (
    <div className="font-body">
      <Carousel
        slideSize={{ base: "100%", sm: "50%" }}
        slideGap={{ base: rem(1), sm: "xl" }}
        align="start"
        slidesToScroll={mobile ? 1 : 2}
      >
        {slides}
      </Carousel>
      <div>
        <div className="font-decorative text-xl pb-4">{plant.type}</div>
        <div>
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
        <JsonInput
          label="Note Pad"
          placeholder="Enter any notes here"
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
          maxRows={4}
        />
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
