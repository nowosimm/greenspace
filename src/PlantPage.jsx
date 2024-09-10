import { Carousel } from "@mantine/carousel";
import { JsonInput, Tabs, rem, Switch, Group, Text } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/carousel/styles.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IconPlus,
  IconList,
  IconInfoCircle,
  IconPhoto,
  IconBrightness2,
  IconDroplet,
  IconSpray,
  IconLeaf,
  IconShovelPitchforks,
  IconUpload,
  IconX,
} from "@tabler/icons-react";

import current from "./images/current.jpeg";
import old from "./images/old.jpeg";

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

  const careInfo = [
    {
      icon: IconBrightness2,
      value: "I need " + plant.sunlight + " sunlight",
    },
    {
      icon: IconDroplet,
      value: "I need watered when " + plant.water + " of my soil is dry",
    },
    {
      icon: IconSpray,
      value: "I need " + plant.humidity + " humidity",
    },
  ];

  const taskInfo = [
    {
      icon: IconLeaf,
      value: "Fertilized 23 days ago",
    },
    {
      icon: IconSpray,
      value: "5 days until next misting",
    },
    {
      icon: IconShovelPitchforks,
      value: "Re-potted 3 month ago",
    },
  ];

  const todayInfo = [
    {
      icon: IconSpray,
      value: "Plant needs misting",
    },
    {
      icon: IconDroplet,
      value: "Plant needs watering",
    },
  ];

  const submitForm = async () => {
    let json = {
      notes: noteValue,
    };
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
            <Carousel.Slide>
              <img src={current}></img>
            </Carousel.Slide>
            <Carousel.Slide>
              <img src={old}></img>
            </Carousel.Slide>
            <Carousel.Slide>
              <img src={current}></img>
            </Carousel.Slide>
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
              <div className="m-5">
                <h2 className="mb-2">Today</h2>
                <div className="flex flex-col p-2 bg-slate-50 rounded-md">
                  {todayInfo.map((p) => (
                    <Switch
                      // defaultChecked
                      color="rgba(83, 107, 76, 1)"
                      className="flex p-2"
                      label={p.value}
                    />
                  ))}
                </div>
              </div>

              <div className="m-5">
                <h2 className="mb-2">Upcoming</h2>
                <div className="flex flex-col p-2 bg-slate-50 rounded-md">
                  {taskInfo.map((p) => (
                    <div className="flex p-2 text-base">
                      <p.icon className="mr-2"></p.icon>
                      <div>{p.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="care">
              <div className="m-5 p-2">
                {careInfo.map((p) => (
                  <div className="flex p-2 bg-slate-50 rounded-md my-5 mt-0">
                    <p.icon className="mr-2"></p.icon>
                    <div>{p.value}</div>
                  </div>
                ))}
                <form name="notes" className="flex flex-col">
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
                    <IconPlus />
                  </button>
                </form>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value="upload">
              <div className="px-3 py-6">
                <Dropzone
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
              </div>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
