import { Carousel } from "@mantine/carousel";
import {
  JsonInput,
  Tabs,
  rem,
  Group,
  Text,
  Checkbox,
  Center,
  Tooltip,
  Paper,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
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
  IconPencil,
  IconCheck,
} from "@tabler/icons-react";
import classes from "../css/CardsCarousel.module.css";

function Card({ image }) {
  console.log({ backgroundImage: `url(${image})` });
  return (
    <Paper
      shadow={0}
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${encodeURI(image)})` }}
      className={classes.card}
    ></Paper>
  );
}

export default function () {
  const iconStyle = { width: rem(12), height: rem(12) };
  const today = dayjs().startOf("day");
  let { plantId } = useParams();
  const [plant, setPlant] = useState({});
  const [files, setFiles] = useState([]);
  const [noteValue, setNoteValue] = useState();
  const [isWatered, setIsWatered] = useState(false);
  const [isMisted, setIsMisted] = useState(false);
  const [lastWatered, setLastWatered] = useState(today.toDate());
  const [lastMisted, setLastMisted] = useState(today.toDate());
  const [value, setValue] = useState();

  const getPlant = async () => {
    let response = await (
      await fetch("http://localhost:3000/" + plantId, {
        credentials: "include",
      })
    ).json();
    setPlant(response);
    setNoteValue(response.notes);
    setIsWatered(dayjs(response.lastWatered).startOf("day").isSame(today));
    setIsMisted(dayjs(response.lastMisted).startOf("day").isSame(today));
    setLastWatered(dayjs(response.lastWatered).startOf("day"));
  };

  useEffect(() => {
    getPlant();
  }, [plantId]);

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

  const onCheckboxChange = (checkboxName) => {
    return (e) => {
      let body = {};
      if (checkboxName == "isMisted") {
        body.lastMisted = today;
        setIsMisted(true);
        setLastMisted();
      }
      if (checkboxName == "isWatered") {
        body.lastWatered = today;
        setIsWatered(true);
        setLastWatered();
      }
      console.log(body);
      return submitForm(e, body);
    };
  };

  const fileUpload = async () => {
    let formData = new FormData();
    if (files.length > 0) {
      files.forEach((f) => {
        formData.append("picture", f);
      });
    }

    let response = await fetch("http://localhost:3000/" + plantId, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    console.log(response);
    getPlant();
  };

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

  let wateringMessage = "dookiet";
  const nextWatering = dayjs(plant.lastWatered)
    .startOf("day")
    .add(plant.water, "day");
  if (today.isBefore(nextWatering)) {
    wateringMessage = dayjs().to(nextWatering, true) + " until next watering";
  }
  if (today.isSame(nextWatering)) {
    wateringMessage = plant.type + " needs watering today";
  }
  if (isWatered == true) {
    wateringMessage = plant.type + " watering completed";
  }
  if (nextWatering.isBefore(today)) {
    wateringMessage =
      dayjs(nextWatering).fromNow(true) + " overdue for scheduled watering";
  }
  console.log(wateringMessage);

  let mistingMessage = "dookier";
  const nextMisting = dayjs(plant.lastMisted)
    .startOf("day")
    .add(plant.humidity, "day");
  if (today.isBefore(nextMisting)) {
    mistingMessage = dayjs().to(nextMisting, true) + " until next misting";
  }
  if (today.isSame(nextMisting)) {
    mistingMessage = plant.type + " needs misting today";
  }
  if (isMisted == true) {
    mistingMessage = plant.type + " misting completed";
  }
  if (nextMisting.isBefore(today)) {
    mistingMessage =
      dayjs(nextMisting).fromNow(true) + " overdue for scheduled misting";
  }

  const todayInfo = [
    {
      icon: IconSpray,
      value: mistingMessage,
      isDone: isMisted,
      name: "isMisted",
      data: "humidityHistory",
    },
    {
      icon: IconDroplet,
      value: wateringMessage,
      isDone: isWatered,
      name: "isWatered",
      data: "waterHistory",
    },
  ];

  const careHistory = [
    {
      icon: IconSpray,
      date: dayjs(lastMisted).format("MM-DD-YYYY"),
      message: "Previously misted",
    },
    {
      icon: IconDroplet,
      date: dayjs(lastWatered).format("MM-DD-YYYY"),
      message: "Previously watered",
    },
  ];

  let alertTasks = (
    <div className="m-5">
      <h2 className="mb-2">Upcoming Tasks</h2>
      <div>
        {todayInfo.map((p) => (
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

  let showCareHistory = (
    <div className="m-5">
      <p>Care History</p>
      <div className="flex flex-col">
        {careHistory.map((p) => (
          <div className="flex my-2">
            <div className="flex items-center rounded-lg bg-light mr-2 px-1 py-2">
              <p.icon className="m-1"></p.icon>
            </div>
            <div className="flex p-2 bg-slate-50 rounded-md items-center grow justify-between">
              <div className="flex p-2">
                <p>{p.message}</p>
                <div className="pl-2 font-semibold">{p.date}</div>
              </div>
              <div className="pr-2">
                <Tooltip
                  label="Edit Date"
                  withArrow
                  position="bottom"
                  color="rgba(134, 153, 129, 1)"
                >
                  <IconPencil variant="default" size={20}></IconPencil>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  let showCareHistory2 = (
    <div className="m-5">
      <p>Care History</p>
      <div className="flex flex-col">
        {careHistory.map((p) => (
          <div className="flex my-2">
            <div className="flex items-center rounded-lg bg-light mr-2 px-1 py-2">
              <p.icon className="m-1"></p.icon>
            </div>
            <div className="flex p-2 bg-slate-50 rounded-md items-center grow justify-between">
              <div className="flex p-2">
                <p>{p.message}</p>
                <div className="pl-2 font-semibold">
                  <DateInput
                    onChange={setValue}
                    placeholder={p.date}
                    variant="filled"
                    radius="lg"
                    size="xs"
                  />
                </div>
              </div>
              <div className="pr-2 flex">
                <Tooltip
                  label="Update Changes"
                  withArrow
                  position="bottom"
                  color="rgba(134, 153, 129, 1)"
                  className="mr-1"
                >
                  <IconCheck variant="default" size={20}></IconCheck>
                </Tooltip>
                <Tooltip
                  label="Discard Changes"
                  withArrow
                  position="bottom"
                  color="rgba(134, 153, 129, 1)"
                  className="ml-1"
                >
                  <IconX variant="default" size={20}></IconX>
                </Tooltip>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  let showImages;
  if (plant.pictures && plant.pictures.length > 0) {
    showImages = (
      <Carousel withIndicators className=" items-center">
        {plant.pictures.map((pic) => (
          <Carousel.Slide>
            <Card
              image={`http://localhost:3000/plant/${plant._id}/picture/${pic}`}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
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

  return (
    <div className="font-body text-base	">
      <div
        className="grid grid-cols-2 auto-rows-fr"
      >
        <div className="">{showImages}</div>

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
              <div>{alertTasks}</div>
              <div>{showCareHistory}</div>
              <div>{showCareHistory2}</div>
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
                    onClick={fileUpload}
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
