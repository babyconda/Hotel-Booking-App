import React from "react";
import { AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { PiTelevisionBold } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { BiRadio } from "react-icons/bi";
export default function Perks({ selected, onChange }) {
  const handleCbClick = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((selectedName) => selectedName !== name)]);
    }
  };

  return (
    <>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"checkbox"}
          checked={selected.includes("wifi")}
          name="wifi"
          onChange={handleCbClick}
        />
        <AiOutlineWifi />
        <span>Wifi</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"checkbox"}
          checked={selected.includes("parking")}
          name="parking"
          onChange={handleCbClick}
        />
        <AiOutlineCar />
        <span>Free parking spot</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"checkbox"}
          checked={selected.includes("tv")}
          name="tv"
          onChange={handleCbClick}
        />
        <PiTelevisionBold />
        <span>TV</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"checkbox"}
          checked={selected.includes("radio")}
          name="radio"
          onChange={handleCbClick}
        />
        <BiRadio />
        <span>Radio</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"checkbox"}
          checked={selected.includes("pets")}
          name="pets"
          onChange={handleCbClick}
        />
        <MdOutlinePets />
        <span>Pets</span>
      </label>
      <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"checkbox"}
          checked={selected.includes("entrance")}
          name="entrance"
          onChange={handleCbClick}
        />
        <BsBoxArrowInLeft />
        <span>Privae entrance</span>
      </label>
    </>
  );
}
