import { Input, Radio, Group, Text, rem } from "@mantine/core";
import { useState, useRef } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
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
  const [files, setFiles] = useState([]);
  const openRef = useRef(null);

  const submitForm = async () => {
    // let json = {
    //   type: plantType,
    //   water: waterMem,
    //   humidity: humidityMem,
    //   sunlight: sunlightMem,
    // };
    let formData = new FormData();
    formData.append('type', plantType);
    formData.append('water', waterMem);
    formData.append('humidity', humidityMem);
    formData.append('sunlight', sunlightMem);
    if(files.length == 1) {
      formData.append('picture', files[0], files[0].name)
    }
    // formData.append('file', files);
    console.log(formData)

    let response = await fetch("http://localhost:3000/addPage", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(json),
      body: formData
    });
    console.log(response);
    // location.reload();
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
