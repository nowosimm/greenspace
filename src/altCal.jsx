import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Calendar, Month } from "@mantine/dates";
import { useParams } from "react-router-dom";
import { Indicator, ScrollArea } from "@mantine/core";
import { IconDroplet, IconSpray } from "@tabler/icons-react";
import { Link, useOutletContext } from "react-router-dom";

export default function () {
  const [plants, setPlants] = useState([]);
  // const [plant, setPlant] = useState({});
  let { plantId } = useParams();
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

  let firstWater = [];

  console.log(firstWater);

  let today = dayjs().startOf("month");
  const fillerTasks = [
    {
      date: dayjs(today.set("day", 2)),
      hasTasks: true,
      icon: IconDroplet,
      value: "Needs Watered",
      type: "Velvet Pathos",
    },
    {
      date: dayjs(today.set("day", 2)),
      hasTasks: true,
      icon: IconSpray,
      value: "Needs Misted",
      type: "Fiddle Leaf Fig",
    },
    {
      date: dayjs(today.set("day", 2)),
      hasTasks: true,
      icon: IconDroplet,
      value: "Needs Watered",
      type: "Fern",
    },
    {
      date: dayjs(today.set("day", 2)),
      hasTasks: true,
      icon: IconSpray,
      value: "Needs Misted",
      type: "Bonsai",
    },
    {
      date: dayjs(today.set("day", 12)),
      hasTasks: true,
      icon: IconDroplet,
      value: "Needs Watered",
      type: "String of Pearls",
    },
    {
      date: dayjs(today.set("day", 17)),
      hasTasks: true,
      icon: IconSpray,
      value: "Needs Misted",
      type: "Chinese Money",
    },
    {
      date: dayjs(today.set("day", 23)),
      hasTasks: true,
      icon: IconSpray,
      value: "Needs Misted",
      type: "Golden Madonna",
    },
  ];


  const [selected, setSelected] = useState(dayjs().startOf("day"));
  const handleSelect = (date) => {
    if (selected && selected.isSame(dayjs(date))) {
      return;
    }
    const dateObject = dayjs(date);
    setSelected(dateObject);
  };
  // console.log(selected)

  let selectedDayTasks = [];

// display misting info
  for (let i = 0; i < plants.length; i++) {
    var plant = plants[i];
    const nextMisting = dayjs(plant.lastMisted).add(plant.humidity, "day");
    if (dayjs(plant.lastMisted).isSame(selected)) {
      selectedDayTasks.push({
        _id: plant._id,
        date: selected,
        icon: IconSpray,
        type: plant.type,
        value: "Misting Completed"
      });
    } 
    if (dayjs(selected).isSame(nextMisting)) {
      selectedDayTasks.push({
        _id: plant._id,
        date: selected,
        icon: IconSpray,
        type: plant.type,
        value: "Needs Misted"
      });
    }
  }

// display watering info
  for (let i = 0; i < plants.length; i++) {
    var plant = plants[i];
    const nextWatering = dayjs(plant.lastWatered).add(plant.water, "day");
    if (dayjs(plant.lastWatered).isSame(selected)) {
      selectedDayTasks.push({
        _id: plant._id,
        date: selected,
        icon: IconDroplet,
        type: plant.type,
        value: "Watering Completed"
      });
    } 
    if (dayjs(selected).isSame(nextWatering)) {
      selectedDayTasks.push({
        _id: plant._id,
        date: selected,
        icon: IconDroplet,
        type: plant.type,
        value: "Needs Watered"
      });
    }
  }
  let displayTasks;
  if (selectedDayTasks.length > 0) {
    displayTasks = (
      <div className="p-5">
        <div>
          <div className="mb-4 font-semibold">
            Tasks for {selected.format("MMMM D, YYYY")}
          </div>
          <ScrollArea h={275}>
            <div className="flex flex-col m-2">
              {selectedDayTasks.map((p) => (
                <Link to={`/plant/${p._id}`} className="p-2" key={p.date}>
                  <div>
                    <div className="flex">
                      <div className="flex items-center rounded-lg bg-light mr-2">
                        <p.icon className="m-2"></p.icon>
                      </div>
                      <div className="flex bg-slate-50 rounded-lg p-5 flex-1">
                        <p className="pr-1 font-semibold">{p.type}</p>
                        <p className="pl-1">{p.value}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    );
  } else {
    displayTasks = (
      <div className="p-5">
        <div className="mb-4 font-semibold">
          There are no tasks for {selected.format("MMMM D, YYYY")}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="mr-4 flex w-fit h-auto">
        <Calendar
          className="p-4 bg-slate-50"
          size="lg"
          firstDayOfWeek={0}
          maxDate={dayjs().add(3, "month")}
          minDate={dayjs().subtract(3, "month")}
          renderDay={(date) => {
            const day = date.getDate();
            return (
              <Indicator
                size={7}
                color="rgba(134, 153, 129, 1)"
                offset={-2}
                disabled={day !== 18}
              >
                <div>{day}</div>
              </Indicator>
            );
          }}
          getDayProps={(date) => ({
            selected: dayjs(date).isSame(selected),
            onClick: () => handleSelect(date),
          })}
        />
      </div>
      <div>{displayTasks}</div>
    </div>
  );
}
