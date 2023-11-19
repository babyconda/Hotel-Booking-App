import React, { useContext } from "react";
import { TbGridDots } from "react-icons/tb";
import { UserContext } from "../UserContext";

export default function ImageDisplay({ place }) {
  const { showAllPhotos, setShowAllPhotos } = useContext(UserContext);
  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-4 md:grid-cols-8  ">
        <div className="col-span-4 ">
          {place?.photos[0] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-video object-cover cursor-pointer rounded-l-xl"
              src={place?.photos[0]}
              alt="First Image"
            />
          )}
        </div>
        <div className="col-span-2 grid gap-y-1">
          {place?.photos[1] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-video object-cover  cursor-pointer"
              src={place?.photos[1]}
              alt=""
            />
          )}
          {place?.photos[2] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-video object-cover  cursor-pointer"
              src={place?.photos[2]}
              alt=""
            />
          )}
        </div>
        <div className="col-span-2 grid gap-y-1">
          {place?.photos[3] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-video object-cover rounded-tr-xl cursor-pointer"
              src={place?.photos[3]}
              alt=""
            />
          )}
          {place?.photos[4] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="aspect-video object-cover rounded-br-xl cursor-pointer"
              src={place?.photos[4]}
              alt=""
            />
          )}
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex items-center px-4 py-1 bg-white absolute bottom-2 right-2 md:bottom-5 md:right-5 border border-black rounded-lg  gap-2 shadow-md shadow-black "
      >
        <TbGridDots className="hidden md:block" />
        Show all photos
      </button>
    </div>
  );
}
