import React, { useContext, useEffect, useState } from "react";
import { Link,useNavigate, useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import Perks from "../components/Perks.jsx";
import PhotosUploader from "../components/PhotosUploader.jsx";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import PropertyCategory from "../components/PropertyCategory.jsx";
import { toast } from "react-toastify";

export default function PlacesPage() {
  const { id } = useParams();
  const { action } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(1999);

  const [coords, setCoords] = useState({ latitude: "", longitude: "" });

  useEffect(() => {
    if (!id) return;

    axios.get("/places/myplace/" + id).then((response) => {
      const { data } = response;
     
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
      setCoords({
        latitude: data?.coords?.latitude,
        longitude: data?.coords?.longitude,
      });
      setCategory(data.category);
    });
  }, [id]);

  const gotLocation = (position) => {
    setCoords({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };
  const failedToGet = () => {
    alert("Please Allow Location");
  };

  const getLoaction = (e) => {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
  };

  const savePlace = async (e) => {
    e.preventDefault();

    if (id) {
      //update
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        await axios.put(
          "/places",
          {
            id,
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
            coords,
            category,
          },
          config
        );
        toast.success("Property Updated Successfully...")
        navigate("/account/places");
      } catch (error) {
        console.log(error);
      }
    } else {
      // New Place
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        await axios.post(
          "/places",
          {
            _id: user._id,
            title,
            address,
            addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
            coords,
            category,
          },
          config
        );
        setTitle("");
        setAddress("");
        setAddedPhotos([]);
        setDescription("");
        setPerks([]);
        setExtraInfo("");
        setCheckIn("");
        setCheckOut("");
        setMaxGuests(1);
        setPrice(1999);
        toast.success("Property Added Successfully...")
        navigate("/account/places");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {action !== "new" && (
        <div className="text-center ">
          <Link
            to={"/account/places/new"}
            className="inline-flex gap-1 items-center bg-primary text-white py-2 px-6 rounded-full "
          >
            <AiOutlinePlus />
            Add new place
          </Link>          
        </div>
      )}

      {action === "new" && (
        <div className="-mr-6 md:mx-16">
          <form onSubmit={savePlace}>
            <h2 className="text-2xl">Title</h2>
            <p className="text-gray-500 text-sm ">
              Title for your place. Should be short and catchy as in
              advertisement
            </p>
            <input
              type={"text"}
              placeholder="Title, for example: My lovely apt"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <h2 className="text-2xl">Address</h2>
            <p className="text-gray-500 text-sm ">Address to this place</p>
            <input
              type={"text"}
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <h2 className="text-2xl">Photos</h2>
            <p className="text-gray-500 text-sm ">more = better</p>
            <PhotosUploader
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
              onChange={setAddedPhotos}
            />
            <h2 className="text-2xl mt-2">Description</h2>
            <p className="text-gray-500 text-sm ">description of the place</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-5"
            />
            <h2 className="text-2xl">Perks</h2>
            <p className="text-gray-500 text-sm ">
              Select all the perks of your place
            </p>

            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2 className="text-2xl mt-3">Property Category</h2>
            <p className="text-gray-500 text-sm ">
              Select the Category of your place
            </p>

            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <PropertyCategory category={category} setCategory={setCategory} />
            </div>

            <h2 className="text-2xl mt-4">Extra info</h2>
            <p className="text-gray-500 text-sm ">house rules, etc</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <h2 className="text-2xl mt-4">Check in&out times</h2>
            <p className="text-gray-500 text-sm ">
              add check in and out times remember to have some time window for
              cleaning the room between guests.
            </p>
            <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type={"Number"}
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type={"Number"}
                  placeholder="11:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type={"Number"}
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  required
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  type={"Number"}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl mt-4">
                Enter Your Current Location Co-ordinates
              </h2>
              <div className="flex ">
                <input
                  type={"text"}
                  placeholder="ex. 17.4434"
                  value={coords.latitude}
                  onChange={(e) =>
                    setCoords({ ...coords, latitude: e.target.value })
                  }
                  required
                />
                <input
                  type={"text"}
                  className="mx-2"
                  placeholder="ex. 19.1836"
                  value={coords.longitude}
                  onChange={(e) =>
                    setCoords({
                      ...coords,
                      longitude: e.target.value,
                    })
                  }
                  required
                />
                <button
                  className="bg-gray-200 px-4 rounded-2xl"
                  onClick={getLoaction}
                >
                  Get&nbsp;My&nbsp;Location
                </button>
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
