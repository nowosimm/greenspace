import { Avatar, Text, Paper } from "@mantine/core";
import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import plant from "./images/plant.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import {
  faSun,
  faDroplet,
  faSprayCanSparkles,
  faPlantWilt,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";

const sunlightIcon = <FontAwesomeIcon icon={faSun} />;
const waterIcon = <FontAwesomeIcon icon={faDroplet} />;
const humidityIcon = <FontAwesomeIcon icon={faSprayCanSparkles} />;
const fertilizeIcon = <FontAwesomeIcon icon={faPlantWilt} />;

export default function () {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    const callServer = async () => {
      let response = await (await fetch("http://localhost:3000/")).json();
      setPlants(response);
    };
    callServer();
  }, []);
  return (
    <div className="w-full">
      <h1 className="font-body font-bold mb-5">Tasks for 07.26</h1>
      <div className="grid grid-cols-3 gap-5 font-body">
        {plants.map((p) => (
          <Link to={`/plant/${p._id}`}>
            <Paper
              key={p._id}
              radius="md"
              withBorder
              p="lg"
              bg="var(--mantine-color-body)"
            >
              <Avatar
                src={plant}
                size={120}
                radius={120}
                mx="auto"
                className="max-w-96"
              />
              <div>
                <Text ta="center" fz="lg" fw={500} mt="md">
                  {p.type}
                </Text>
                <Text ta="center" fz="sm">
                  {waterIcon} Needs watering in 5 days
                </Text>
                <Text ta="center" fz="sm">
                  {humidityIcon} Needs misting in 3 days
                </Text>
              </div>
            </Paper>
          </Link>
        ))}
      </div>

      <Link to="/calendar">
      <Container className="rounded-lg my-5 p-2 font-body border border-gray-200">
        <p className="font-semibold mb-2">Upcoming Tasks</p>
        <p className="ml-3">{waterIcon} 2 plants need watering tomorrow</p>
      </Container>
      </Link>

      <Link to="/calendar">
      <Container className="rounded-lg my-5 p-2 font-body border border-gray-200">
        <p className="font-semibold mb-2">Reminders</p>
        <p className="ml-3">
          {fertilizeIcon} 3 plants need fertiziling this month
        </p>
      </Container>
      </Link>

    </div>
  );
}
