import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Calendar, Month } from "@mantine/dates";
import { Indicator, Accordion, rem } from "@mantine/core";
import { IconDroplet, IconSpray } from "@tabler/icons-react";

export default function () {
  let today = dayjs().startOf("month");
  const fillerTasks = [
    {
      date: dayjs(today.set("day", 2)),
      hasTasks: true,
      icon: IconDroplet,
      value: "2 plants need watered",
    },
    {
      date: dayjs(today.set("day", 2)),
      hasTasks: true,
      icon: IconSpray,
      value: "2 plants need misted",
    },
    {
      date: dayjs(today.set("day", 12)),
      hasTasks: true,
      icon: IconDroplet,
      value: "5 plants need watered",
    },
    {
      date: dayjs(today.set("day", 17)),
      hasTasks: true,
      icon: IconSpray,
      value: "6 plants need misted",
    },
    {
      date: dayjs(today.set("day", 27)),
      hasTasks: true,
      icon: IconSpray,
      value: "4 plants need misted",
    },
  ];
  const [selected, setSelected] = useState(dayjs());
  const handleSelect = (date) => {
    if (selected && selected.isSame(dayjs(date))) {
      setSelected(undefined);
      return;
    }
    const dateObject = dayjs(date);
    setSelected(dateObject);
  };

  let selectedDayTasks = [];
  if (selected) {
    for (let i = 0; i < fillerTasks.length; i++) {
      //   console.log(fillerTasks[i].date.format(), selected.format());
      if (fillerTasks[i].date.isSame(selected)) {
        selectedDayTasks.push(fillerTasks[i]);
      }
    }
  }

  let displayTasks;
  if (selectedDayTasks.length > 0) {
    displayTasks = (
      <div>
        <div>
          <div className="mb-4 font-semibold">
            Tasks for {selected.format("MMMM D, YYYY")}
          </div>

          {selectedDayTasks.map((p) => (
            <Accordion
              key={p.value}
              className="bg-slate-50 mb-4 rounded-lg"
              variant="separated"
            >
              <Accordion.Item value="tasks">
                <Accordion.Control
                  icon={
                    <p.icon
                      style={{
                        width: rem(20),
                        height: rem(20),
                      }}
                    />
                  }
                >
                  {p.value}
                </Accordion.Control>
                <Accordion.Panel>
                  <ol className="list-disc px-6">
                    <li>Fiddle Leaf Fig</li>
                    <li>Velvet Pathos</li>
                    <li>Fern</li>
                  </ol>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ))}
        </div>
      </div>
    );
  } else {
    displayTasks = (
      <div>
        <div className="mb-4 font-semibold">There are no tasks for {selected.format("MMMM D, YYYY")}</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="mr-4 flex w-fit h-auto">
        <Calendar
        className="bg-slate-50 p-4 rounded-xl"
          size="md"
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
