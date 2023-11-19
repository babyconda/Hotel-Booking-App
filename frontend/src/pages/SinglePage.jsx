import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { AiOutlineWifi, AiOutlineCar } from "react-icons/ai";
import { BiRadio } from "react-icons/bi";
import { MdOutlinePets } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { BsDoorOpen } from "react-icons/bs";

import { differenceInCalendarDays } from "date-fns";
import { UserContext } from "../UserContext";
import ImageDisplay from "../components/ImageDisplay";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { toast } from 'react-toastify';

import MapPage from "../components/MapPage";
import PageLoader from "../components/PageLoader";

export default function SinglePage() {
  const { id } = useParams();
  const {
    user,
    showAllPhotos,
    setShowAllPhotos,
    startDate,
    setStateDate,
    endDate,
    setEndDate,
    loadingSpin, setLoadingSpin
  } = useContext(UserContext);

  const navigate = useNavigate();
  
  const [place, setPlace] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [wifi, setWifi] = useState("");
  const [parking, setParking] = useState("");
  const [radio, setRadio] = useState("");
  const [pets, setPets] = useState("");
  const [tv, setTV] = useState("");
  const [entrance, setEntrance] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSelect = (ranges) => {
    setStateDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  useEffect(() => {
    setCheckIn(startDate.toLocaleDateString("en-US"));
    setCheckOut(endDate.toLocaleDateString("en-US"));
  }, [startDate, endDate]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  useEffect(() => {
    if (place) {
      place.perks.map((perk) => {
        if (perk === "wifi") {
          setWifi("Wifi");
        } else if (perk === "parking") {
          setParking("Free Parking");
        } else if (perk === "tv") {
          setTV("TV");
        } else if (perk === "pets") {
          setPets("Pets Allowed");
        } else if (perk === "radio") {
          setRadio("Radio");
        } else {
          setEntrance("Private Entrance");
        }
      });
    }
  }, [place]);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNight = 0;
  if (checkIn && checkOut) {
    numberOfNight = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async () => {
    if (!user) navigate("/login");
    if(numberOfNight === 0) {
      toast.warning("Please Select Date...")
      return;
    } 
    else{
      const userData = {
      user: user._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      owner: place.owner,
      price: numberOfNight * place.price,
    };
    const { data } = await axios.post("/bookings", userData);
    navigate(`/account/bookings/${data._id}`);
    toast.success("Place Booked Successfully..");
    }
    
  };

  useEffect(() => {
    setLoadingSpin(true);
    if (!id) return;
    axios.get(`/place/${id}`).then((response) => {
      setPlace(response.data);
      setLoadingSpin(false);
    });
  }, [id]);

  if (!place) {
    return(
    <PageLoader loading ={loadingSpin} setLoading={setLoadingSpin}/>

    )
  };
  if (showAllPhotos) {
    return (
      <>
        <div className="absolute inset-0 bg-white  min-h-screen p-7">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed bg-white px-2 py-2 pl-3 hover:bg-gray-100 rounded-full 
            flex items-center justify-center "
          >
            <MdArrowBackIos className="text-xl " />
          </button>
          <div className="flex justify-center">
            <div className="md:p-8 md:m-8 -mr-6 md:mx-20 md:px-20 grid gap-4">
              {place?.photos?.length > 0 &&
                place.photos.map((photo, id) => (
                  <div className="  " key={id}>
                    <img
                      className="md:w-full "
                      src={photo}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    <PageLoader loading ={loadingSpin} setLoading={setLoadingSpin}/>
    <div className=" mx-4  md:py-4 md:px-8 md:mx-20">
      <h1 className="text-3xl mt-8">{place?.title} </h1>
      <div className="flex items-center gap-1 mb-2">
        <FiMapPin />
        <a
          className="my-2 block font-semibold underline "
          target={"_blank"}
          href={"https://maps.google.com/?q=" + place?.address}
        >
          {place?.address}
        </a>
      </div>
      <ImageDisplay place={place} setShowAllPhotos={setShowAllPhotos} />

      <div className="grid mt-4 gap-8  grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4 text-justify">
            <h2 className="font-semibold text-xl ">Description</h2>
            <h3 className="text-gray-500">{place.description}</h3>
          </div>
          <hr className="mb-3" />
          <h1 className="text-xl font-semibold mb-2 ">
            What this place offers
          </h1>
          <div className="flex items-center justify-between text-lg text-gray-500 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <AiOutlineWifi className="text-2xl" />{" "}
                {wifi ? (
                  <h1>{"Wifi"}</h1>
                ) : (
                  <h1 className=" line-through ">{"Wifi"}</h1>
                )}{" "}
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineCar className="text-2xl" />{" "}
                {parking ? (
                  <h1>{"Parking"}</h1>
                ) : (
                  <h1 className=" line-through ">{"Parking"}</h1>
                )}{" "}
              </div>
              <div className="flex items-center gap-2">
                <BiRadio className="text-2xl" />
                {radio ? (
                  <h1>{"Radio"}</h1>
                ) : (
                  <h1 className=" line-through ">{"Radio"}</h1>
                )}{" "}
              </div>
            </div>

            <div className="mr-20">
              <div className="flex items-center gap-2">
                <MdOutlinePets className="text-2xl" />{" "}
                {pets ? (
                  <h1>{"Pets Allowed"}</h1>
                ) : (
                  <h1 className=" line-through ">{"Pets Allowed"}</h1>
                )}{" "}
              </div>
              <div className="flex items-center gap-2">
                <PiTelevision className="text-2xl" />{" "}
                {tv ? (
                  <h1>{"TV"}</h1>
                ) : (
                  <h1 className=" line-through ">{"TV"}</h1>
                )}{" "}
              </div>
              <div className="flex items-center gap-2">
                <BsDoorOpen className="text-2xl" />
                {entrance ? (
                  <h1>{"Private Entrance"}</h1>
                ) : (
                  <h1 className=" line-through ">{"Private Entrance"}</h1>
                )}{" "}
              </div>
            </div>
          </div>
          <hr className="mb-3" />
          <h1 className="text-xl font-semibold mb-2 ">Things to know</h1>
          <div
            className="text-gray-500"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <span className=""> Check-In:-</span> {place.checkIn}:00
            <br />
            <span className="">Check-Out: </span>
            {place.checkOut}:00
            <br />
            <span className="">Max number of guests:</span> {place.maxGuests}
          </div>
        </div>
        <div className="relative mt-6">
          <div className="bg-white shadow-2xl p-4 rounded-2xl border border-gray-200 mb-8">
            <div className="text-2xl text-center">
              Price: &#8377;{place.price} / per night
            </div>
            <div className="flex mt-8 mx-4 flex-col justify-center border border-gray-400 rounded-xl">
              <div
                className="flex cursor-pointer "
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <div className="border-r border-gray-400 p-2 w-full">
                  <label className="font-semibold text-xs cursor-pointer">
                    CHECK-IN
                  </label>
                  <br />
                  {!checkIn ? (
                    "Add date"
                  ) : (
                    <h1 className="text-sm cursor-pointer">{checkIn}</h1>
                  )}
                </div>

                <div className="p-2 w-full cursor-pointer">
                  <label
                    id="checkOut"
                    className="font-semibold text-xs cursor-pointer"
                  >
                    CHECKOUT
                  </label>
                  <br />
                  {!checkOut ? (
                    "Add date"
                  ) : (
                    <h1 className="text-sm cursor-pointer">{checkOut}</h1>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-400 py-2 px-4">
                <label className="font-semibold">Max number of guests</label>
                <br />
                <input
                  className="cursor-pointer"
                  type={"number"}
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                />
              </div>
              {numberOfNight > 0 && (
                <>
                  <div className="border-t border-gray-400 py-2 px-4">
                    <label className="font-semibold">Your full name</label>
                    <br />
                    <input
                      className="cursor-pointer"
                      type={"text"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="border-t border-gray-400 py-2 px-4">
                    <label className="font-semibold">Phone number</label>
                    <br />
                    <input
                      className="cursor-pointer"
                      type={"tel"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
            <button onClick={bookThisPlace} className="primary mb-2">
              Book this place{" "}
              {numberOfNight > 0 && (
                <span>&#8377;{numberOfNight * place.price}</span>
              )}{" "}
            </button>
          </div>
          {showDatePicker ? (
            <>
              <DateRangePicker
                ranges={[selectionRange]}
                minDate={new Date()}
                rangeColors={["#FD5B61"]}
                onChange={handleSelect}
                className="md:absolute flex justify-end shadow-2xl  z-10 md:top-20 md:right-80 md:mr-12"
              />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className=" py-4 border-t mt-8 -mb-8">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-md text-gray-700 leading-5 text-justify">
          {place.extraInfo}
        </div>
      </div>
      <div className=" py-4 w-[100%]   border-t mt-8">
        <h2 className="font-semibold text-2xl mt-3">Where you’ll be</h2>
        <h2 className=" text-lg mt-3">{place?.address}</h2>
        <MapPage
          place={place}
          latitude={place.coords.latitude}
          longitude={place.coords.longitude}
        />
      </div>
    </div>
    </>
  );
}
