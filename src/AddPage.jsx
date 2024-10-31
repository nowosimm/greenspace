import { Input, Radio, Group, Text, rem, Slider, Button } from "@mantine/core";
import { useState, useRef } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { DateInput } from "@mantine/dates";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  IconSun,
  IconDroplet,
  IconSpray,
  IconPhoto,
  IconUpload,
  IconX,
  IconPencil,
  IconGift,
  IconPlant,
  IconCactus,
  IconFlower,
  IconGrowth,
  IconLeaf,
  IconSeeding,
} from "@tabler/icons-react";
import dayjs from "dayjs";

export default function () {
  const [plantType, setPlantType] = useState("");
  const [sunlightMem, setSunlightMem] = useState("Direct");
  const [plantIcon, setPlantIcon] = useState("");
  const [waterMem, setWaterMem] = useState(5);
  const [humidityMem, setHumidityMem] = useState(5);
  const [lastWatered, setLastWatered] = useState(
    dayjs().startOf("day").toDate()
  );
  const [lastMisted, setLastMisted] = useState(dayjs().startOf("day").toDate());
  const [purchaseDate, setPurchaseDate] = useState(
    dayjs().startOf("day").toDate()
  );
  const [files, setFiles] = useState([]);
  const openRef = useRef(null);
  const [value, setValue] = useState(null);
  const { getPlants } = useOutletContext();
  const navigate = useNavigate();

  const submitForm = async () => {
    let formData = new FormData();
    formData.append("type", plantType);
    formData.append("water", waterMem);
    formData.append("humidity", humidityMem);
    formData.append("sunlight", sunlightMem);
    formData.append("lastWatered", lastWatered);
    formData.append("lastMisted", lastMisted);
    formData.append("purchaseDate", purchaseDate);
    formData.append("plantIcon", plantIcon);
    if (files.length == 1) {
      formData.append("picture", files[0], files[0].name);
    }
    // formData.append('file', files);
    console.log(formData);

    let response = await fetch("http://localhost:3000/addPage", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    console.log(response);
    await getPlants();
    navigate(`/`);
  };
  return (
    <form name="form1">
      <div className="font-body">
        <div>
          <h1 className="mt-7 font-bold">Plant Information</h1>
          <div className="m-5">
            <div className="flex my-3">
              <div className="flex items-center rounded-lg bg-light mr-2">
                <IconPencil className="m-2"></IconPencil>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 flex-1">
                <Input.Wrapper
                  label="Plant Name"
                  error=""
                  // description="Input description"
                >
                  <Input
                    placeholder="Enter plant type / nickname here"
                    radius="lg"
                    type="text"
                    name="type"
                    id="type"
                    onChange={(e) => setPlantType(e.target.value)}
                  />
                </Input.Wrapper>
              </div>
            </div>
            <div className="flex my-3">
              <div className="flex items-center rounded-lg bg-light mr-2">
                <IconGift className="m-2"></IconGift>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 flex-1">
                <Input.Wrapper
                  label="Plant Birthday"
                  error=""
                  description="Enter date plant was acquired"
                >
                  <DateInput
                    radius="lg"
                    onChange={setPurchaseDate}
                    name="purchaseDate"
                    value={purchaseDate}
                  />
                </Input.Wrapper>
              </div>
            </div>
            <div className="flex my-3">
              <div className="flex items-center rounded-lg bg-light mr-2">
                <IconGift className="m-2"></IconGift>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 flex-1">
                  <Radio.Group
                    value={plantIcon}
                    onChange={setPlantIcon}
                    name="plantIcon"
                    label={<span className="font-semibold">Plant Icon</span>}
                    description="Icon will appear on task list"
                    className=""
                  >
                    <Group mt="xs" name="plantIcon" id="plantIcon">
                      <Radio
                        value="IconCactus"
                        label={<IconCactus></IconCactus>}
                        color="rgba(134, 153, 129, 1)"
                      />
                      <Radio
                        value="IconPlant"
                        label={<IconPlant></IconPlant>}
                        color="rgba(134, 153, 129, 1)"
                      />
                      <Radio
                        value="IconFlower"
                        label={<IconFlower></IconFlower>}
                        color="rgba(134, 153, 129, 1)"
                      />
                      <Radio
                        value="IconLeaf"
                        label={<IconLeaf></IconLeaf>}
                        color="rgba(134, 153, 129, 1)"
                      />
                      <Radio
                        value="IconSeeding"
                        label={<IconSeeding></IconSeeding>}
                        color="rgba(134, 153, 129, 1)"
                      />
                    </Group>
                  </Radio.Group>

                  {/* <div className="flex mt-4">
                  <Button color="rgba(134, 153, 129, 1)" radius="lg" className="mx-1">
                    <IconCactus></IconCactus>
                  </Button>
                  <Button color="rgba(134, 153, 129, 1)" radius="lg" className="mx-1">
                    <IconPlant></IconPlant>
                  </Button>
                  <Button color="rgba(134, 153, 129, 1)" radius="lg" className="mx-1">
                    <IconFlower></IconFlower>
                  </Button>
                  <Button color="rgba(134, 153, 129, 1)" radius="lg" className="mx-1">
                    <IconLeaf></IconLeaf>
                  </Button>
                  <Button color="rgba(134, 153, 129, 1)" radius="lg" className="mx-1">
                    <IconSeeding></IconSeeding>
                  </Button>
                  </div> */}
              </div>
            </div>
          </div>

          <h2 className="mt-7 font-bold">Care Instructions</h2>
          <div className="m-5">
            <div className="flex my-3">
              <div className="flex items-center rounded-lg bg-light mr-2">
                <IconDroplet className="m-2"></IconDroplet>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 flex-1">
                <Input.Wrapper
                  value={waterMem}
                  name="water"
                  type="number"
                  label="Days Between Watering"
                  description="Enter Value Between 1 and 30 days"
                >
                  <Slider
                    min={0}
                    max={30}
                    step={1}
                    defaultValue={5}
                    onChange={setWaterMem}
                    color="rgba(134, 153, 129, 1)"
                    className="my-4"
                  />
                </Input.Wrapper>
                <DateInput
                  radius="lg"
                  onChange={setLastWatered}
                  label="Last Watered"
                  placeholder="Enter date of last watering"
                  name="lastWatered"
                  value={lastWatered}
                />
              </div>
            </div>

            <div className="flex my-3">
              <div className="flex items-center rounded-lg bg-light mr-2">
                <IconSpray className="m-2"></IconSpray>
              </div>
              <div className="bg-slate-50 rounded-lg p-5 flex-1">
                <Input.Wrapper
                  value={humidityMem}
                  name="humidity"
                  type="number"
                  label="Days Between Misting"
                  description="Select Value Between 1 and 30 days"
                >
                  <Slider
                    min={0}
                    max={30}
                    step={1}
                    defaultValue={5}
                    onChange={setHumidityMem}
                    color="rgba(134, 153, 129, 1)"
                    className="my-4"
                  />
                </Input.Wrapper>
                <DateInput
                  radius="lg"
                  onChange={setLastMisted}
                  label="Last Watered"
                  placeholder="Enter date of last misting"
                  name="lastMisted"
                  value={lastMisted}
                />
              </div>
            </div>

            <div className="flex my-3">
              <div className="flex items-center rounded-lg bg-light mr-2">
                <IconSun className="m-2"></IconSun>
              </div>
              <div className="bg-slate-50 rounded-lg px-5 flex-1">
                <Radio.Group
                  value={sunlightMem}
                  onChange={setSunlightMem}
                  name="sunlight"
                  label={<span className="font-semibold">Sunlight Needs</span>}
                  description="Choose Plants Desired Sunlight"
                  className="my-8"
                >
                  <Group mt="xs" name="sunlight" id="sunlight">
                    <Radio
                      value="Direct"
                      label="Direct"
                      color="rgba(134, 153, 129, 1)"
                    />
                    <Radio
                      value="Bright Indirect"
                      label="Bright Indirect"
                      color="rgba(134, 153, 129, 1)"
                    />
                    <Radio
                      value="Moderate"
                      label="Moderate"
                      color="rgba(134, 153, 129, 1)"
                    />
                    <Radio
                      value="Low"
                      label="Low"
                      color="rgba(134, 153, 129, 1)"
                    />
                  </Group>
                </Radio.Group>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mt-7 font-bold">Image Upload</h2>
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
          </div>
        </div>
      </div>
      <div className="flex justify-end mx-5">
        <button
          type="button"
          onClick={submitForm}
          className="flex justify-end rounded-md bg-soft px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
        >
          Save Plant Information
        </button>
      </div>
    </form>
  );
}
