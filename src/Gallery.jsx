import current from "./images/current.jpeg";
import old from "./images/old.jpeg";
import plant from "./images/plant.jpeg";
import shelf from "./images/plantShelf.jpeg";

export default function () {
  return (
    <div className="font-body">
      <div className="font-semibold text-xl mb-10">Gallery</div>
      <div class="grid grid-cols-3 gap-5 border-5 m-5">
        <img
          class="w-full aspect-square rounded-md hover:opacity-35"
          src={old}
        />
        <img class="w-full aspect-square rounded-md hover:opacity-35" src={current} />
        <img class="w-full aspect-square rounded-md hover:opacity-35" src={plant} />
        <img class="w-full aspect-square rounded-md hover:opacity-35" src={plant} />
        <img class="w-full aspect-square rounded-md hover:opacity-35" src={old} />
        <img class="w-full aspect-square rounded-md hover:opacity-35" src={current} />
      </div>
    </div>
  );
}
