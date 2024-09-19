import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Calendar } from "@mantine/dates";
import { Indicator } from "@mantine/core";
import { IconDroplet, IconSpray } from "@tabler/icons-react";

export default function () {
  const [selected, setSelected] = useState();
  const handleSelect = (date) => {
    if(selected && selected.isSame(dayjs(date))) {
        setSelected(undefined)
    } else {
        setSelected(dayjs(date));
    }
  };

  const dailyTasks = [
    {
      icon: IconDroplet,
      value: "3 plants need watered",
    },
    {
      icon: IconSpray,
      value: "5 plants need misted",
    },
  ];


  const fillerTasks = [
    {
      day: 3,
      icon: IconDroplet,
      value: "2 plants need watered",
    },
    {
      day: 3,
      icon: IconSpray,
      value: "2 plants need misted",
    },
    {
      day: 13,
      icon: IconDroplet,
      value: "5 plants need watered",
    },
    {
      day: 18,
      icon: IconSpray,
      value: "4 plants need misted",
    },
    {
        day: 28,
        icon: IconSpray,
        value: "4 plants need misted",
      },
  ];

  let displayTasks;
  if (selected) {
    displayTasks = (
      <div>
        Tasks for {selected.format()}
          {dailyTasks.map((p) => (
            <div className="flex my-3" key={p.value}>
              <div className="flex items-center rounded-lg bg-light mr-2 px-1 py-2">
                <p.icon className="m-1"></p.icon>
              </div>
              <div className="flex p-2 bg-slate-50 rounded-md items-center grow">
                <div>{p.value}</div>
              </div>
            </div>
          ))}
      </div>
    );
  } else {
    displayTasks = 
    <div>
        <div>There are no tasks for selected date</div>
    </div>

  }

  return (
    <div className="flex">
      <div className="mr-4">
        <Calendar
          firstDayOfWeek={0}
          renderDay={(date) => {
            const day = date.getDate();
            return (
              <Indicator
                size={7}
                color="rgba(134, 153, 129, 1)"
                offset={-2}
                disabled={day !== 16}
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
