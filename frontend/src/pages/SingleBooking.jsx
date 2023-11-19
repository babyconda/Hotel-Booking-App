import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays, format } from "date-fns";
import { useParams } from "react-router-dom";
import ImageDisplay from "../components/ImageDisplay";
import { UserContext } from "../UserContext";
import { FiMapPin } from "react-icons/fi";
import { BiMoon } from "react-icons/bi";
import { BsCalendarWeek, BsDot } from "react-icons/bs";
import { MdArrowBackIos } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { IoMdCall } from "react-icons/io";
import PageLoader from "../components/PageLoader";

export default function SingleBooking() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const { user, showAllPhotos, setShowAllPhotos, loadingSpin, setLoadingSpin } = useContext(UserContext);

  const persionalBooking = async () => {
    try {
      const { data } = await axios.get(`/bookings/${user._id}`);
      const foundBooking = data.find(({ _id }) => _id === id);
      if (foundBooking) {
        setBooking(foundBooking);
        setLoadingSpin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };  

  useEffect(() => {
    if(user){
      setLoadingSpin(true);
      persionalBooking();
    }
  }, [user]);
 

  if (!booking) {
    return (
      <PageLoader loading ={loadingSpin} setLoading={setLoadingSpin}/>
    );
  }
  if (showAllPhotos) {
    return (
      <>
        <div className="absolute inset-0 bg-white  min-h-screen p-7">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed bg-transparent px-2 py-2 pl-3 hover:bg-gray-100 rounded-full 
            flex items-center justify-center "
          >
            <MdArrowBackIos className="text-xl " />
          </button>
          <div className="flex justify-center">
            <div className="md:p-8 -mr-10 -ml-5  m-8 md:mx-20 md:px-20 grid gap-4">
              {booking?.place?.photos?.length > 0 &&
                booking?.place.photos.map((photo, id) => (
                  <div className="  " key={id}>
                    <img
                      className="w-full "
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
      <div className="ml-4 md:mx-12 mt-12">
        <div className="text-2xl font-semibold ">{booking.place.title}</div>
        <div className="flex items-center gap-1 mb-4">
          <FiMapPin />
          <a
            className="my-2 block font-semibold underline "
            target={"_blank"}
            href={"https://maps.google.com/?q=" + booking.place?.address}
          >
            {booking.place?.address}
          </a>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48">
            {booking?.place?.photos[0] && (
              <img
                className="aspect-video object-cover cursor-pointer rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                src={booking?.place?.photos[0]}
                alt=""
              />
            )}
          </div>

          <div className="py-3 pr-3 pl-4 grow flex bg-gray-400 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none relative">
            <div className="mt-2">
              <h2 className="text-xl  overflow-hidden">
                {booking?.place?.title}
              </h2>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center">
                  <BiMoon />
                  {differenceInCalendarDays(
                    new Date(booking?.checkOut),
                    new Date(booking?.checkIn)
                  )}{" "}
                  nights:
                </div>
                <div className="flex items-center ">
                  <BsCalendarWeek className="mr-1" />
                  {format(new Date(booking?.checkIn), "dd-MM-yyyy")} {"->"}
                  <BsCalendarWeek className="mx-1 ml-2" />
                  {format(new Date(booking?.checkOut), "dd-MM-yyyy")}
                </div>
              </div>
              <div className="flex items-center gap-8 justify-start text-gray-600">
                <div className="flex items-center  justify-start">
                  <AiOutlineUser />
                  <BsDot />
                  <h2>{booking.name}</h2>
                </div>
                <div className="flex items-center justify-start">
                  <IoMdCall />
                  <BsDot />
                  <h2>{booking.phone}</h2>
                </div>
              </div>
            </div>

            <div className="absolute right-2 -top-14  md:right-20 md:top-5  items-center gap-2 text-lg font-semibold bg-red-700 text-white p-2 rounded-2xl">
              Total price
              <h2> &#8377; {booking?.price} </h2>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <ImageDisplay place={booking?.place} />
        </div>
      </div>
    </>
  );
}
