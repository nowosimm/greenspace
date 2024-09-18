import { Carousel } from "@mantine/carousel";
import { JsonInput, Tabs, rem, Switch, Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/carousel/styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import {
  IconPlus,
  IconList,
  IconInfoCircle,
  IconPhoto,
  IconSun,
  IconDroplet,
  IconSpray,
  IconLeaf,
  IconShovelPitchforks,
  IconUpload,
  IconX,
} from "@tabler/icons-react";

export default function () {
  const iconStyle = { width: rem(12), height: rem(12) };
  let { plantId } = useParams();
  const [plant, setPlant] = useState({});
  const [noteValue, setNoteValue] = useState();
  useEffect(() => {
    const callServer = async () => {
      let response = await (
        await fetch("http://localhost:3000/" + plantId, {
          credentials: "include",
        })
      ).json();
      setPlant(response);
      setNoteValue(response.notes);
      console.log(response);
    };
    callServer();
  }, [plantId]);

  let wateringMessage = "";
  const nextWatering = dayjs(plant.lastWatered).add(plant.water, "day");
  if (dayjs().isBefore(nextWatering)) {
    wateringMessage = dayjs().to(nextWatering, true) + " until next watering";
  } else {
    wateringMessage =
      dayjs(nextWatering).fromNow(true) + " overdue for scheduled watering";
  }
  console.log(wateringMessage);

  let mistingMessage = "";
  const nextMisting = dayjs(plant.lastMisted).add(plant.humidity, "day");
  if (dayjs().isBefore(nextMisting)) {
    mistingMessage = dayjs().to(nextMisting, true) + " until next misting";
  } else {
    mistingMessage =
      dayjs(nextMisting).fromNow(true) + " overdue for scheduled misting";
  }

  const careInfo = [
    {
      icon: IconSun,
      value: "I need " + plant.sunlight + " sunlight",
    },
    {
      icon: IconDroplet,
      value: "I need watered every " + plant.water + " days",
    },
    {
      icon: IconSpray,
      value: "I need misted every " + plant.humidity + " days",
    },
  ];

  const taskInfo = [
    {
      icon: IconDroplet,
      value: wateringMessage,
    },
    {
      icon: IconSpray,
      value: mistingMessage,
    },
  ];

  const todayInfo = [
    {
      icon: IconSpray,
      value: "Plant needs misting",
      isDone: plant.isMisted,
      name: "isMisted",
    },
    {
      icon: IconDroplet,
      value: "Plant needs watering",
      isDone: plant.isWatered,
      name: "isWatered",
    },
  ];

  console.log(todayInfo);

  const onCheckboxChange = (checkboxName) => {
    return (e) => {
      // console.log(checkboxName +": "+ e.currentTarget.checked)
      console.log(`${checkboxName}: ${e.currentTarget.checked}`);
      let body = {};
      if (checkboxName == "isMisted") {
        body.isMisted = e.currentTarget.checked;
      }
      if (checkboxName == "isWatered") {
        body.isWatered = e.currentTarget.checked;
      }
      console.log(body);
      return submitForm(e, body);
    };
  };

  let alertWateringTasks;
  if (nextMisting.isSame()) {
    alertWateringTasks = (
      <div className="m-5">
        <h2 className="mb-2">Today</h2>
        <div className="flex flex-col p-2 bg-slate-50 rounded-md">
          <form>
            {todayInfo.map((p) => (
              <Switch
                // defaultChecked
                color="rgba(83, 107, 76, 1)"
                className="flex p-2"
                label={p.value}
                onChange={onCheckboxChange(p.name)}
                checked={p.isDone}
                name={p.name}
                id={p.name}
              />
            ))}
          </form>
        </div>
      </div>
    );
  } else {
    alertWateringTasks = (
      <div className="m-5">
        <h2 className="mb-2">Upcoming</h2>
        <div>
          {taskInfo.map((p) => (
            <div className="flex my-3">
              <div className="flex items-center rounded-lg bg-light mr-2 px-1 py-2">
                <p.icon className="m-1"></p.icon>
              </div>
              <div className="flex p-2 bg-slate-50 rounded-md items-center grow">
                <div>{p.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // submitForm(EVENT(), ????)
  const submitForm = async (e, body) => {
    console.log(body);
    let json = {
      notes: noteValue,
    };
    if (body) {
      json = body;
    }
    let response = await fetch("http://localhost:3000/" + plantId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(json),
    });
    console.log(response);
    location.reload();
  };

  return (
    <div className="font-body text-base	">
      <div className="grid grid-cols-2">
        <div>
          <Carousel withIndicators>
            {plant.picturePath && (
              <Carousel.Slide>
                <img
                  src={`http://localhost:3000/plant/${plant._id}/picture/${plant.picturePath}`}
                ></img>
              </Carousel.Slide>
            )}
          </Carousel>
        </div>

        <div className="mx-5">
          <div className="font-decorative text-3xl pb-4 mb-2 text-coolBlack">
            {plant.type}
          </div>
          <Tabs color="rgba(119, 140, 130, 1)" defaultValue="tasks">
            <Tabs.List grow justify="center">
              <Tabs.Tab
                value="tasks"
                leftSection={<IconList style={iconStyle} />}
              >
                Tasks
              </Tabs.Tab>
              <Tabs.Tab
                value="care"
                leftSection={<IconInfoCircle style={iconStyle} />}
              >
                Care Info
              </Tabs.Tab>

              <Tabs.Tab
                value="upload"
                leftSection={<IconPhoto style={iconStyle} />}
              >
                Image Upload
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="tasks">
              <div>{alertWateringTasks}</div>
              {/* <div className="m-5">
                <h2 className="mb-2">Today</h2>
                <div className="flex flex-col p-2 bg-slate-50 rounded-md">
                  <form>
                    {todayInfo.map((p) => (
                      <Switch
                        // defaultChecked
                        color="rgba(83, 107, 76, 1)"
                        className="flex p-2"
                        label={p.value}
                        onChange={onCheckboxChange(p.name)}
                        checked={p.isDone}
                        name={p.name}
                        id={p.name}
                      />
                    ))}
                  </form>
                </div>
              </div>

              <div className="m-5">
                <h2 className="mb-2">Upcoming</h2>
                <div>
                  {taskInfo.map((p) => (
                    <div className="flex my-3">
                      <div className="flex items-center rounded-lg bg-light mr-2 px-1 py-2">
                        <p.icon className="m-1"></p.icon>
                      </div>
                      <div className="flex p-2 bg-slate-50 rounded-md items-center grow">
                        <div>{p.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
            </Tabs.Panel>

            <Tabs.Panel value="care">
              <div className="m-5 p-2">
                {careInfo.map((p) => (
                  <div className="flex my-3">
                    <div className="flex items-center rounded-lg bg-light mr-2 px-1 py-2">
                      <p.icon className="m-1"></p.icon>
                    </div>
                    <div className="flex p-2 bg-slate-50 rounded-md items-center grow">
                      <div>{p.value}</div>
                    </div>
                  </div>
                ))}
                <form name="notes" className="flex flex-col mt-5">
                  <div>
                    <JsonInput
                      type="text"
                      name="notes"
                      id="notes"
                      label="Note Pad"
                      placeholder="Enter any notes here"
                      formatOnBlur
                      autosize
                      minRows={4}
                      value={noteValue}
                      onChange={setNoteValue}
                      maxRows={10}
                    />
                  </div>
                  <button
                    className="flex justify-end text-sm hover:cursor-pointer p-2 items-center"
                    type="button"
                    onClick={submitForm}
                  >
                    <div className="pr-1">Save</div>
                  </button>
                </form>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="upload">
              <div className="px-3 py-6">
                <form>
                  <Dropzone
                    className="m-5"
                    onDrop={(acceptedFiles) => {
                      console.log("accepted files", acceptedFiles);
                      setFiles(acceptedFiles);
                    }}
                    onReject={(files) => console.log("rejected files", files)}
                    maxSize={5 * 1024 ** 2}
                    accept={IMAGE_MIME_TYPE}
                    name="picture"
                    // {...props}
                  >
                    <Group
                      justify="center"
                      gap="xl"
                      mih={220}
                      style={{ pointerEvents: "none" }}
                    >
                      <Dropzone.Accept>
                        <IconUpload
                          style={{
                            width: rem(52),
                            height: rem(52),
                            color: "var(--mantine-color-blue-6)",
                          }}
                          stroke={1.5}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          style={{
                            width: rem(52),
                            height: rem(52),
                            color: "var(--mantine-color-red-6)",
                          }}
                          stroke={1.5}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto
                          style={{
                            width: rem(52),
                            height: rem(52),
                            color: "var(--mantine-color-dimmed)",
                          }}
                          stroke={1.5}
                        />
                      </Dropzone.Idle>

                      <div>
                        <Text size="xl" inline>
                          Upload Images Here
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                          Attach as many images as you like
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>
                  <button
                    className="flex justify-end text-sm hover:cursor-pointer p-2 items-center"
                    type="button"
                    onClick={submitForm}
                  >
                    <div className="pr-1">Save</div>
                  </button>
                </form>
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
