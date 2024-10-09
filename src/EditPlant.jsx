import {
  Input,
  Radio,
  Group,
  Alert,
  rem,
  Slider,
  Button,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { DateInput } from "@mantine/dates";
import {
  IconSun,
  IconDroplet,
  IconSpray,
  IconPencil,
  IconGift,
  IconTrash,
  IconInfoCircle,
  IconArrowNarrowLeft,
} from "@tabler/icons-react";
import dayjs from "dayjs";

export default function () {
  const [plant, setPlant] = useState({});
  const [plantType, setPlantType] = useState();
  const [sunlightMem, setSunlightMem] = useState();
  const [waterMem, setWaterMem] = useState();
  const [humidityMem, setHumidityMem] = useState();
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
  const navigate = useNavigate();
  let { plantId } = useParams();
  const [
    confirmDiscardChanges,
    { open: openConfirmChanges, close: closeConfirmChanges },
  ] = useDisclosure(false);
  const [
    confirmDelete,
    { open: openConfirmDelete, close: closeConfirmDelete },
  ] = useDisclosure(false);

  useEffect(() => {
    const callServer = async () => {
      let response = await (
        await fetch("http://localhost:3000/" + plantId, {
          credentials: "include",
        })
      ).json();
      setPlant(response);
      //   setNoteValue(response.notes);
      console.log(response);
    };
    callServer();
  }, [plantId]);

  useEffect(() => {
    setPlantType(plant.type);
    setSunlightMem(plant.sunlight);
    setWaterMem(plant.water);
    setHumidityMem(plant.humidity);
    setLastWatered(dayjs(plant.lastWatered).startOf("day").toDate());
    setLastMisted(dayjs(plant.lastMisted).startOf("day").toDate());
    setPurchaseDate(dayjs(plant.purchaseDate).startOf("day").toDate());
  }, [plant]);

  const submitForm = async () => {
    let formData = new FormData();
    formData.append("type", plantType);
    formData.append("water", waterMem);
    formData.append("humidity", humidityMem);
    formData.append("sunlight", sunlightMem);
    formData.append("lastWatered", lastWatered);
    formData.append("lastMisted", lastMisted);
    formData.append("purchaseDate", purchaseDate);
    if (files.length == 1) {
      formData.append("picture", files[0], files[0].name);
    }
    // formData.append('file', files);
    console.log(formData);

    let response = await fetch(`http://localhost:3000/${plant._id}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    console.log(response);
    navigate(`/`);
  };

  return (
    <>
      <Modal
        opened={confirmDiscardChanges}
        onClose={closeConfirmChanges}
        title="Discard Changes"
        centered
      >
        <div>
          Going back will discard all changes. Are you sure?
        </div>
        <button
          className="flex justify-end rounded-md bg-soft px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 mr-3"
          type="button"
          onClick={() => navigate(`/plant/${plant._id}`)}
        >
          <IconTrash></IconTrash>
        </button>
      </Modal>

      <Modal
        opened={confirmDelete}
        onClose={closeConfirmDelete}
        title="Delete Plant Entry"
        centered
      >
        <div>
            This will permanently delete this plant and all of its data. Are you sure?
        </div>
        <button
          className="flex justify-end rounded-md bg-soft px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 mr-3"
          type="button"
          onClick={() => navigate(`/`)}
        >
          <IconTrash></IconTrash>
        </button>
      </Modal>
      <form name="form1">
        <div className="font-body">
          <div>
            <h1 className="mt-7 font-bold">{plant.type} Information</h1>
            <div className="m-5">
              <div className="flex my-3">
                <div className="flex items-center rounded-lg bg-light mr-2">
                  <IconPencil className="m-2"></IconPencil>
                </div>
                <div className="bg-slate-50 rounded-lg p-5 flex-1">
                  <Input.Wrapper label="Plant Name" error="">
                    <Input
                      placeholder="Enter Plant Name"
                      radius="lg"
                      type="text"
                      name="type"
                      id="type"
                      value={plantType}
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
                      value={waterMem}
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
                    name="humidity"
                    type="number"
                    label="Days Between Misting"
                    description="Select Value Between 1 and 30 days"
                  >
                    <Slider
                      min={0}
                      max={30}
                      step={1}
                      value={humidityMem}
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
                    label={
                      <span className="font-semibold">Sunlight Needs</span>
                    }
                    description="Choose Plants Desired Sunlight"
                    className="my-8"
                  >
                    <Group mt="xs" name="sunlight" id="sunlight">
                      <Radio
                        value="Direct"
                        label="Direct"
                        color="rgba(134, 153, 129, 1)"
                        checked={waterMem == true}
                      />
                      <Radio
                        value="Bright Indirect"
                        label="Bright Indirect"
                        color="rgba(134, 153, 129, 1)"
                        checked={waterMem == true}
                      />
                      <Radio
                        value="Moderate"
                        label="Moderate"
                        color="rgba(134, 153, 129, 1)"
                        checked={waterMem == true}
                      />
                      <Radio
                        value="Low"
                        label="Low"
                        color="rgba(134, 153, 129, 1)"
                        checked={waterMem == true}
                      />
                    </Group>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mx-5">
          <div className="flex justify-end rounded-md bg-soft px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 mr-3">
            <button type="button" onClick={() => openConfirmChanges()}>
              <IconArrowNarrowLeft></IconArrowNarrowLeft>
            </button>
          </div>
          <button
            className="flex justify-end rounded-md bg-soft px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600 mr-3"
            type="button" onClick={() => openConfirmDelete()}
          >
            <IconTrash></IconTrash>
          </button>
          <button
            type="button"
            onClick={submitForm}
            className="flex justify-end rounded-md bg-soft px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
          >
            Update Information
          </button>
        </div>
      </form>
    </>
  );
}
