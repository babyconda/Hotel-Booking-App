import React from "react";
import {
  GiFarmer,
  GiWindow,
  GiTreehouse,
  GiCampingTent,
  GiWoodCabin,
  GiMountainCave,
} from "react-icons/gi";

import { PiSwimmingPool } from "react-icons/pi";
import { BiHome } from "react-icons/bi";
import { BsBuildings } from "react-icons/bs";
import { MdOutlineAir, MdWaves } from "react-icons/md";

export default function PlaceCategory({
  selecter,  
  filterByCategory,
}) {
  return (
    <div className="flex items-center  overflow-x-auto  gap-3  no-scrollbar  justify-around text-gray-500 px-5 text-sm mt-6 -mb-5">
      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "room" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("room")}
      >
        <BsBuildings className="text-2xl" />
        <h2 className="pb-2">Rooms</h2>
      </div>

      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "lakeFront" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("lakeFront")}
      >
        <MdOutlineAir className="text-2xl" />
        <h2 className="pb-2">Lakefront</h2>
      </div>

      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "tinyHomes" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("tinyHomes")}
      >
        <BiHome className="text-2xl" />
        <h2 className="pb-2 md:flex">
          Tiny <span className="hidden md:block">&nbsp; homes</span>
        </h2>
      </div>
      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "farms" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("farms")}
      >
        <GiFarmer className="text-2xl" />
        <h2 className="pb-2">Farms</h2>
      </div>
      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "amazingView"
            ? "text-black border-b-2 border-black  "
            : ""
        } `}
        onClick={() => filterByCategory("amazingView")}
      >
        <GiWindow className="text-2xl" />
        <h2 className="pb-2 md:flex">
          Amazing <span className="hidden md:block">&nbsp;View</span>
        </h2>
      </div>

      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "beachFront"
            ? "text-black border-b-2 border-black  "
            : ""
        } `}
        onClick={() => filterByCategory("beachFront")}
      >
        <MdWaves className="text-2xl" />
        <h2 className="pb-2 md:flex">
          Beach <span className="hidden md:block">&nbsp;Front</span>
        </h2>
      </div>
      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "caves" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("caves")}
      >
        <GiMountainCave className="text-2xl" />
        <h2 className="pb-2">Caves</h2>
      </div>
      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "treehouse" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("treehouse")}
      >
        <GiTreehouse className="text-2xl" />
        <h2 className="pb-2">Treehouses</h2>
      </div>
      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "camping" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("camping")}
      >
        <GiCampingTent className="text-2xl" />
        <h2 className="pb-2">Camping</h2>
      </div>
      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "cabins" ? "text-black border-b-2 border-black  " : ""
        } `}
        onClick={() => filterByCategory("cabins")}
      >
        <GiWoodCabin className="text-2xl" />
        <h2 className="pb-2">Cabins</h2>
      </div>

      <div
        className={`flex flex-col items-center hover:text-black cursor-pointer  ${
          selecter === "amazingPools"
            ? "text-black border-b-2 border-black  "
            : ""
        } `}
        onClick={() => filterByCategory("amazingPools")}
      >
        <PiSwimmingPool className="text-2xl" />
        <h2 className="pb-2 flex">
          <span className="hidden md:block">Amazing</span>&nbsp;Pools
        </h2>
      </div>
    </div>
  );
}
