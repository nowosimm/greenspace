import { Carousel } from "@mantine/carousel";
import {
  JsonInput,
  Tabs,
  rem,
  Group,
  Text,
  Checkbox,
  Center,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/carousel/styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Link } from "react-router-dom";
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
import {
  IconSettings,
  IconList,
  IconInfoCircle,
  IconPhoto,
  IconSun,
  IconDroplet,
  IconSpray,
  IconPhotoPlus,
  IconGift,
  IconUpload,
  IconX,
  IconPlant,
  IconCactus,
  IconFlower,
  IconGrowth,
  IconLeaf,
  IconSeeding



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
  const nextWatering = dayjs(plant.lastWatered).startOf("day").add(plant.water, "day");
  if (dayjs().isBefore(nextWatering)) {
    wateringMessage = dayjs().to(nextWatering, true) + " until next watering";
  } 
  if (dayjs().startOf("day") == (nextWatering)) {
    wateringMessage = plant.type + " needs watering today";
  }
  else {
    wateringMessage =
      dayjs(nextWatering).fromNow(true) + " overdue for scheduled watering";
  }
  console.log(wateringMessage);

  let mistingMessage = "";
  const nextMisting = dayjs(plant.lastMisted).startOf("day").add(plant.humidity, "day");
  if (dayjs().isBefore(nextMisting)) {
    mistingMessage = dayjs().to(nextMisting, true) + " until next misting";
  } 
  if (dayjs().startOf("day") == (nextMisting)) {
    wateringMessage = plant.type + " needs watering today";
  }
  else {
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
    {
      icon: IconGift,
      value: "My birthday is " + dayjs(plant.purchaseDate).format("LL"),
    },
  ];

  const taskInfo = [
    {
      icon: IconDroplet,
      value: wateringMessage,
      name: "isWatered",
    },
    {
      icon: IconSpray,
      value: mistingMessage,
      name: "isMisted",
    },
  ];

  const todayInfo = [
    {
      icon: IconSpray,
      value: "Plant needs misting",
      isDone: plant.isMisted,
      name: "isMisted",
      data: "humidityHistory"
    },
    {
      icon: IconDroplet,
      value: "Plant needs watering",
      isDone: plant.isWatered,
      name: "isWatered",
      data: "waterHistory"
    },
  ];

  const onCheckboxChange = (checkboxName) => {
    return (e) => {
      let body = {};
      if (checkboxName == "isMisted") {
        body.lastMisted = dayjs().startOf("day");
        body.humidityHistory = dayjs().startOf("day");
      }
      if (checkboxName == "isWatered") {
        body.lastWatered = dayjs().startOf("day");
        body.waterHistory = dayjs().startOf("day");
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
              <Checkbox
                radius="xl"
                size="md"
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
              <div className="flex p-2 bg-slate-50 rounded-md items-center grow justify-between">
                <div>{p.value}</div>
                <form>
                  <Checkbox
                    radius="xl"
                    size="md"
                    color="rgba(83, 107, 76, 1)"
                    className="flex p-2"
                    onChange={onCheckboxChange(p.name)}
                    checked={p.isDone}
                    name={p.name}
                    id={p.name}
                  />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  let showImages;
  if (plant.picturePath) {
    showImages = (
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
    );
  } else {
    showImages = (
      <div className="bg-slate-50 rounded-lg flex flex-col mx-6 h-full">
        <Center className="flex flex-col p-10 h-full">
          Greenspace is better with images!
          <div className="p-6">
          <IconPhotoPlus></IconPhotoPlus>
          </div>

        </Center>
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
        <div>{showImages}</div>

        <div className="mx-5">
          <div className="flex justify-between">
            <div className="font-decorative text-3xl pb-4 mb-2 text-coolBlack">
              {plant.type}
            </div>
            <div>
              <Link to={`/plant/${plant._id}/edit`}>
                <button>
                  <IconSettings></IconSettings>
                </button>
              </Link>
            </div>
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
