import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Pill, ScrollArea, Image, Avatar, Center } from "@mantine/core";
import { Link, useOutletContext } from "react-router-dom";
import{
  IconDroplet,
  IconSpray,
  IconMoodSmile,
  IconPlant,
  IconCactus,
  IconFlower,
  IconGrowth,
  IconLeaf,
  IconSeeding,
} from "@tabler/icons-react";
import * as tabler from "@tabler/icons-react";
import icon from "./images/greenspaceIcon.jpeg";
import "../css/Gallery.css";

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

  const icons = [
    {
      icon: IconPlant,
      value: "IconPlant",
    },
    {
      icon: IconCactus,
      value: "IconCactus",
    },
    {
      icon: IconFlower,
      value: "IconFlower",
    },
    {
      icon: IconGrowth,
      value: "IconGrowth",
    },
    {
      icon: IconLeaf,
      value: "IconLeaf",
    },
    {
      icon: IconSeeding,
      value: "IconSeeding",
    },
  ]

  console.log(gallery);

  let randomGallery;
  if (gallery.length > 0) {
    const randomIndex = Math.floor(Math.random() * gallery.length);
    const randomItem = gallery[randomIndex];
    const randomSrc = randomItem.src;
    const plantName = randomItem.type;
    const link = `/plant/${randomItem._id}`;
    randomGallery = (
      <Link to={link}>
        <div className="container">
          <img src={randomSrc} className="image rounded-xl"></img>
          <div className="middle">
            <div className="text">{plantName}</div>
          </div>
        </div>
      </Link>
    );
  } else {
    randomGallery = <div>no images SADLY</div>;
  }

  const mockContent = [
    {
      date: "28",
      iconWater: IconDroplet,
      iconHumidity: IconSpray,
      water: "3 plants needs watered",
      misted: "4 plants need misted",
    },
    {
      date: "29",
      iconWater: IconDroplet,
      iconHumidity: IconSpray,
      water: "2 plants needs watered",
      misted: "No plants need misted",
    },
    {
      date: "30",
      iconWater: IconDroplet,
      iconHumidity: IconSpray,
      water: "No plants needs watered",
      misted: "4 plants need misted",
    },
    {
      date: "01",
      iconWater: IconDroplet,
      iconHumidity: IconSpray,
      water: "No plants needs watered",
      misted: "4 plants need misted",
    },
    {
      date: "02",
      iconWater: IconDroplet,
      iconHumidity: IconSpray,
      water: "No plants needs watered",
      misted: "4 plants need misted",
    },
    {
      date: "03",
      iconWater: IconDroplet,
      iconHumidity: IconSpray,
      water: "No plants needs watered",
      misted: "4 plants need misted",
    },
    {
      date: "03",
      iconWater: IconDroplet,
      iconHumidity: IconSpray,
      water: "No plants needs watered",
      misted: "4 plants need misted",
    },
  ];

  const startDate = dayjs();
  for (let i = 0; i < 7; i++) {
    const date = startDate.add(i, "day");
    mockContent[i].date = date;
  }

  let todaysTasks = [];
  for (let i = 0; i < plants.length; i++) {
    var plant = plants[i];
    const nextMisting = dayjs(plant.lastMisted).add(plant.humidity, "day");
    const icon = tabler[plant.plantIcon]
    if (dayjs().startOf("day").isSame(nextMisting)) {
      todaysTasks.push({
        _id: plant._id,
        icon: icon,
        type: plant.type,
        value: "Needs Misted",
      });
    }
    const nextWatering = dayjs(plant.lastWatered).add(plant.water, "day");

    if (dayjs().startOf("day").isSame(nextWatering)) {
      todaysTasks.push({
        _id: plant._id,
        icon: icon,
        type: plant.type,
        value: "Needs Watered",
      });
    }
  }

  let displayTodaysTasks;
  if (todaysTasks.length > 0) {
    displayTodaysTasks = (
      <ScrollArea h={600}>
        {todaysTasks.map((p) => (
          <Link to={`/plant/${p._id}`}>
            <div className="flex bg-light rounded-xl p-5 my-2 justify-between">
              <div className="pr-10">
                <p className="font-semibold">{p.type}</p>
                <Pill className="m-2">{p.value}</Pill>
              </div>
              {/* <Avatar src={p.icon} size={120} className="max-w-96" /> */}
              <p.icon></p.icon>
            </div>
          </Link>
        ))}
      </ScrollArea>
    );
  } else {
    displayTodaysTasks = (
      <div className="bg-slate-50 rounded-2xl flex p-5">
        Yay! You have no tasks today!
        <IconMoodSmile></IconMoodSmile>
      </div>
    );
  }

  let weeklyTasks = [];
  for (let i = 0; i < plants.length; i++) {
    var plant = plants[i];
    for (let j = 0; j < 7; j++) {
      const date = startDate.add(j, "day").startOf("day");
      const nextMisting = dayjs(plant.lastMisted).add(plant.humidity, "day");
      if (date.isSame(nextMisting)) {
        weeklyTasks.push({
          _id: plant._id,
          type: plant.type,
          date: date,
          value: `${plant.type} needs misting`,
        });
      }
      const nextWatering = dayjs(plant.lastWatered).add(plant.water, "day");
      if (date.isSame(nextWatering)) {
        weeklyTasks.push({
          _id: plant._id,
          type: plant.type,
          date: date,
          value: `${plant.type} needs watering`,
        });
      }
    }
  }

  let homeContent;
  if (user.username) {
    homeContent = (
      <div>
        <div className="grid grid-cols-3 gap-8 font-body">
          {/* column one */}
          <div>
            <div className="mb-2">
              <h1 className="flex flex-1 rounded-xl font-semibold">
                Todays Tasks
              </h1>
            </div>
            <div>{displayTodaysTasks}</div>
          </div>
          {/* column two */}
          <div>
            <div className="mb-2">
              <h1 className="flex flex-1 rounded-xl font-semibold">
                Featured Plant
              </h1>
            </div>
            <div>{randomGallery}</div>
          </div>
          {/* column three */}
          <div>
            <div className="mb-2">
              <h1 className="flex flex-1 rounded-xl font-semibold">
                Upcoming Tasks
              </h1>
            </div>
            <ScrollArea h={600}>
              {weeklyTasks.map((p) => (
                <div className="bg-slate-50 p-3 rounded-xl m-2">
                  <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                      <p className="flex font-light">{p.date.format("ddd")}</p>
                      <p className="font-semibold tracking-wide">
                        {p.date.format("DD")}
                      </p>
                      <hr className="border-t-1 border-slate-800 rounded-2xl"></hr>
                    </div>
                    <div>
                      <div className="px-5 flex">
                        <div className="m-1 flex justify-center">{p.value}</div>
                      </div>
                      <div className="px-5 flex"></div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    );
  } else {
    homeContent = (
      <Center className="flex flex-col">
        <div className="flex text-xl">
          <h2>Welcome to</h2>
          <h2 className="font-decorative pl-3">Greenspace</h2>
        </div>
        <div className="w-5/12 block ">
          <img src={icon}></img>
        </div>
        <div className="flex">
          <Link to="/sign-up">
            <p className="underline underline-offset-2 font-semibold">
              Sign In
            </p>
          </Link>
          <p className="pl-2">to View Plants</p>
        </div>
      </Center>
    );

  }
  return <div>{homeContent}</div>;
}
