import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { BiMoon } from "react-icons/bi";
import { BsCalendarWeek, BsCreditCard2Back, BsDot } from "react-icons/bs";
import { Link } from "react-router-dom";
import PageLoader from "../components/PageLoader";

export default function BookingPage() {
  const { user, loadingSpin, setLoadingSpin } = useContext(UserContext);
  const [bookings, setBookings] = useState([]);  
  const [msg, setMsg] = useState('')

  const getBookings = async () => {
    const { data } = await axios.get(`/bookings/${user._id}`);
    if(data){
      setLoadingSpin(false);      
    }
    if(data.length === 0){
      setMsg("No Booking Found...!");
    }
    setBookings(data);
  };
  useEffect(() => {
    setLoadingSpin(true);
    getBookings();
  }, []);

  return (    
    <>
    <div className="-mt-16">
      <PageLoader loading ={loadingSpin} setLoading={setLoadingSpin}/>
    </div>
      <div className="md:px-8 md:mx-8 mt-16 -mr-5">
            {bookings.map((booking) => (
              <Link
                key={booking._id}
                to={`/account/bookings/${booking._id}`}
                className="flex flex-col md:flex-row gap-4 bg-gray-100 rounded-2xl overflow-hidden md:mb-2 mb-6 cursor-pointer"
              >
                <div className="md:w-48 ">
                  {booking?.place?.photos[0] && (
                    <img
                      className="aspect-video object-cover cursor-pointer rounded-l-xl rounded-bl-none"
                      src={booking?.place?.photos[0]}
                      alt=""
                    />
                  )}
                </div>
                <div className="pl-2 md:py-3 pr-3 grow flex flex-col gap-y-1 ">
                  <h2 className="text-xl">{booking?.place?.title}</h2>
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
                      {format(new Date(booking.checkIn), "dd-MM-yyyy")} {"->"}
                      <BsCalendarWeek className="mx-1 ml-2" />
                      {format(new Date(booking.checkOut), "dd-MM-yyyy")}
                    </div>
                  </div>

                  <div className="flex gap-4 text-gray-500 items-center font-semibold">
                    <div className="flex gap-2 items-center">
                      <h1 className="flex items-center justify-center">
                        <BsDot className="hidden md:block" />
                        Name :-
                      </h1>
                      <h1>{booking.name}</h1>
                    </div>
                    <div className="flex gap-2 items-center ">
                      <h1 className="flex items-center justify-center">
                        <BsDot className="hidden md:block" />
                        ContactNumber :-
                      </h1>
                      <h1>{booking.phone}</h1>
                    </div>
                  </div>
                </div>
                <div className="flex md:flex-col gap-4 md:gap-0 py-4 items-center justify-center bg-primary p-2 px-4 text-white text-lg font-semibold">
                  <BsCreditCard2Back className="text-2xl" />
                  <h1>Total price </h1>
                  <h1>&#8377;{booking.price}</h1>
                </div>
              </Link>
            ))}
        
          {bookings.length === 0 && 
          <h2 className="text-2xl flex justify-center mt-28 mb-40 font-semibold ">
            {msg}
            </h2>}
      </div>
    </>
    
  );
}
