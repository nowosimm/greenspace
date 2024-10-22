import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Calendar, Month } from "@mantine/dates";
import { useParams } from "react-router-dom";
import { Indicator, ScrollArea } from "@mantine/core";
import { IconDroplet, IconSpray, IconMoodSmile } from "@tabler/icons-react";
import { Link, useOutletContext } from "react-router-dom";

export default function () {
  const [plants, setPlants] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);
  const today = dayjs().startOf("day");
  const [selected, setSelected] = useState(today);
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

  useEffect(() => {
    // loop over each day in the month to see if there is a task
    let tasks = [];
    for (let i = 0; i < plants.length; i++) {
      var plant = plants[i];
      const nextMisting = dayjs(plant.lastMisted).add(plant.humidity, "day");
      tasks.push({
        _id: plant._id,
        date: nextMisting,
        icon: IconSpray,
        type: plant.type,
        value: "Needs Misted",
      });
      const nextWatering = dayjs(plant.lastWatered).add(plant.water, "day");
      tasks.push({
        _id: plant._id,
        date: nextWatering,
        icon: IconDroplet,
        type: plant.type,
        value: "Needs Watered",
      });
    }
    setAllTasks(tasks);
  }, [plants]);

  const handleSelect = (date) => {
    setSelectedDayTasks([]);
    if (selected && selected.isSame(dayjs(date))) {
      return;
    }
    const dateObject = dayjs(date);
    setSelected(dateObject);
  };

  useEffect(() => {
    const selectedTasks = [];
    // display misting info
    for (let i = 0; i < plants.length; i++) {
      var plant = plants[i];
      const nextMisting = dayjs(plant.lastMisted).add(plant.humidity, "day");
      if (dayjs(plant.lastMisted).isSame(selected)) {
        selectedTasks.push({
          _id: plant._id,
          date: selected,
          icon: IconSpray,
          type: plant.type,
          value: "Misting Completed",
        });
      }
      if (dayjs(selected).isSame(nextMisting)) {
        selectedTasks.push({
          _id: plant._id,
          date: selected,
          icon: IconSpray,
          type: plant.type,
          value: "Needs Misted",
        });
      }
    }

    // display watering info
    for (let i = 0; i < plants.length; i++) {
      var plant = plants[i];
      const nextWatering = dayjs(plant.lastWatered).add(plant.water, "day");
      if (dayjs(plant.lastWatered).isSame(selected)) {
        selectedTasks.push({
          _id: plant._id,
          date: selected,
          icon: IconDroplet,
          type: plant.type,
          value: "Watering Completed",
        });
      }
      if (dayjs(selected).isSame(nextWatering)) {
        selectedTasks.push({
          _id: plant._id,
          date: selected,
          icon: IconDroplet,
          type: plant.type,
          value: "Needs Watered",
        });
      }
    }

    setSelectedDayTasks(selectedTasks);
  }, [plants, selected]);

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
                <Link to={`/plant/${p._id}`} className="p-2" key={p._id}>
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
            const hasTasksForDay = allTasks.some((task) =>
              dayjs(task.date).isSame(dayjs(date), "day")
            );

            return (
              <Indicator
                size={6}
                color="rgba(134, 153, 129, 1)"
                offset={-2}
                disabled={!hasTasksForDay}
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
