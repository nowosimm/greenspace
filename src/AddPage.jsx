import { Input, Radio, Group } from "@mantine/core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faDroplet,
  faSprayCanSparkles,
} from "@fortawesome/free-solid-svg-icons";

const sunlightIcon = <FontAwesomeIcon icon={faSun} />;
const waterIcon = <FontAwesomeIcon icon={faDroplet} />;
const humidityIcon = <FontAwesomeIcon icon={faSprayCanSparkles} />;

export default function () {
  const [plantType, setPlantType] = useState("");
  const [sunlightMem, setSunlightMem] = useState();
  const [waterMem, setWaterMem] = useState();
  const [humidityMem, setHumidityMem] = useState();

  const submitForm = async () => {
    let json = {
      type: plantType,
      water: waterMem,
      humidity: humidityMem,
      sunlight: sunlightMem,
    };
    let response = await fetch("http://localhost:3000/addPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });
    console.log(response);
    location.reload();
  };
  return (
    <form name="form1">
      <div className="font-body">
        <h1 className="font-bold text-lg mb-5">New Plant Form</h1>
        <div>
          <Input.Wrapper label="Plant Name" description="" error="">
            <Input
              placeholder="Enter plant type / nickname here"
              type="text"
              name="type"
              id="type"
              onChange={(e) => setPlantType(e.target.value)}
            />
          </Input.Wrapper>

          <h2 className="mt-7 font-bold">Care Instructions</h2>
          <div className="bg-slate-50 rounded-lg p-5 mt-2">
            <Radio.Group
              value={waterMem}
              onChange={setWaterMem}
              name="water"
              label={
                <span className="font-semibold">{waterIcon} Water Needs</span>
              }
              className="my-4"
            >
              <Group mt="xs" name="water" id="water">
                <Radio value="Keep Moist" label="Keep Moist" />
                <Radio value="Top 1/3" label="Top 1/3" />
                <Radio value="Top 1/2" label="Top 1/2" />
                <Radio value="Dry Out" label="Dry Out" />
              </Group>
            </Radio.Group>

            <Radio.Group
              value={sunlightMem}
              onChange={setSunlightMem}
              name="sunlight"
              label={
                <span className="font-semibold">
                  {sunlightIcon} Sunlight Needs
                </span>
              }
              className="my-8"
            >
              <Group mt="xs" name="sunlight" id="sunlight">
                <Radio value="Direct" label="Direct" />
                <Radio value="Bright Indirect" label="Bright Indirect" />
                <Radio value="Moderate" label="Moderate" />
                <Radio value="Low" label="Low" />
              </Group>
            </Radio.Group>
            <Radio.Group
              value={humidityMem}
              onChange={setHumidityMem}
              name="humidity"
              label={
                <span className="font-semibold">
                  {humidityIcon} Humidity Needs
                </span>
              }
              className="my-4"
            >
              <Group mt="xs" name="humidity" id="humidity">
                <Radio value="Extreme" label="Extreme" />
                <Radio value="High" label="High" />
                <Radio value="Moderate" label="Moderate" />
                <Radio value="Low" label="Low" />
              </Group>
            </Radio.Group>
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={submitForm}
        className="rounded-md bg-lime-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
      >
        Save
      </button>
    </form>
  );
}
