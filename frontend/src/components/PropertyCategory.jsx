import React from "react";

export default function PropertyCategory({ category, setCategory }) {
  console.log(category);
  return (
    <>
      <div className="border p-4 flex rounded-2xl gap-1 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          onChange={(e) => setCategory("room")}
          checked={`${category}` === "room"}
          required
        />
        <label htmlFor="room">Room </label>
      </div>
      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="Lakefront"
          name="category"
          checked={`${category}` === "lakeFront"}
          onChange={(e) => setCategory("lakeFront")}
        />
        <label htmlFor="Lakefront">Lakefront </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "tinyHomes"}
          onChange={(e) => setCategory("tinyHomes")}
        />
        <label htmlFor="room">Tiny homes </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "farms"}
          onChange={(e) => setCategory("farms")}
        />
        <label htmlFor="room">Farms </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "amazingView"}
          onChange={(e) => setCategory("amazingView")}
        />
        <label htmlFor="room">Amazing View </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "beachFront"}
          onChange={(e) => setCategory("beachFront")}
        />
        <label htmlFor="room">Beach front </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "caves"}
          onChange={(e) => setCategory("caves")}
        />
        <label htmlFor="room">Caves </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "treehouse"}
          onChange={(e) => setCategory("treehouse")}
        />
        <label htmlFor="room">Treehouse </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "camping"}
          onChange={(e) => setCategory("camping")}
        />
        <label htmlFor="room">Camping </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "cabins"}
          onChange={(e) => setCategory("cabins")}
        />
        <label htmlFor="room">Cabins </label>
      </div>

      <div className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
        <input
          type={"radio"}
          id="room"
          name="category"
          checked={`${category}` === "amazingPools"}
          onChange={(e) => setCategory("amazingPools")}
        />
        <label htmlFor="room">Amazing Pools </label>
      </div>
    </>
  );
}
