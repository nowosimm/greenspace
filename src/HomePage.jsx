import { Avatar, Text, Paper, Center } from "@mantine/core";
import { useEffect, useState } from "react";
import { Container } from "@mantine/core";
import plant from "./images/plant.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useOutletContext } from "react-router-dom";
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

import icon from "./images/greenspaceIcon.jpeg";

export default function () {
  const [plants, setPlants] = useState([]);
  const [user, setUser] = useOutletContext();
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

  let homeContent;
  if (user.username) {
    homeContent = (
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
              {fertilizeIcon} 3 plants need fertilized this month
            </p>
          </Container>
        </Link>
      </div>
    );
  } else {
    homeContent = (
      <Center className="flex flex-col">
        <div className="flex text-xl">
          <h2>Welcome to</h2>
          <h2 className="font-decorative pl-2">Greenspace</h2>
        </div>
        <div className="w-5/12 block ">
          <img src={icon}></img>
        </div>
        <div className="flex">
          <Link to="/sign-up">
          <p className="underline underline-offset-2 font-semibold">Sign In</p>
          </Link>
        <p className="pl-2">to View Plants</p>
        </div>
      </Center>
    );
  }
  return <div>{homeContent}</div>;
}
