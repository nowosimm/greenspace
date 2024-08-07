import { ScrollArea } from "@mantine/core";

import current from "./images/current.jpeg";
import old from "./images/old.jpeg";
import plant from "./images/plant.jpeg";
import shelf from "./images/plantShelf.jpeg";

export default function () {
  return (
    <div className="font-body">
      <div className="font-semibold text-xl mb-10">Gallery</div>
      <ScrollArea h={650}>
        <div className="grid grid-cols-3 gap-5 border-5 m-5">
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={old}
          />
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={current}
          />
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={plant}
          />
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={plant}
          />
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={old}
          />
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={current}
          />
                  <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={plant}
          />
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={old}
          />
          <img
            className="w-full aspect-square rounded-md hover:opacity-35"
            src={current}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
