import React, { useContext } from "react";
import { SiAirbnb } from "react-icons/si";
import { BiSearchAlt2, BiMenu } from "react-icons/bi";
import { BiSolidUserCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiGlobe } from "react-icons/bi";
import { UserContext } from "./UserContext";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

export default function Header() {
  const {
    user,
    startDate,
    setStateDate,
    endDate,
    setEndDate,
    showDatePicker,
    setShowDatePicker,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelect = (ranges) => {
    setStateDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <>
      <div
        className={
          location.pathname !== "/" ? "mx-0 -mr-5   md:mx-16" : "-mr-5  "
        }
      >
        <header className="px-4 pt-4 flex justify-between z-10 ">
          <Link
            to="/"
            className="flex items-center gap-1 text-4xl text-primary ml-6 max-sm:ml-2 "
          >
            <SiAirbnb className="" />
            <span className="font-bold text-2xl  ">BeerTNT</span>
          </Link>
          <div>
            <div
              className="md:flex items-center justify-center gap-2 border border-gray-300 rounded-full py-1.5 px-6 ml-40 max-sm:mx-4 shadow-md shadow-gray-300 cursor-pointer hidden  "
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <div className="font-semibold">Anywhere</div>
              <div className="border-l border-gray-300 pl-4 font-semibold">
                Any week
              </div>
              <div className="border-l border-gray-300 pl-4 text-gray-400">
                Add guests
              </div>

              <button className="bg-primary  text-white p-2 rounded-full -mr-4">
                <BiSearchAlt2 />
              </button>
            </div>
            {showDatePicker ? (
              <>
                <DateRangePicker
                  ranges={[selectionRange]}
                  minDate={new Date()}
                  rangeColors={["#FD5B61"]}
                  onChange={handleSelect}
                  className="absolute shadow-2xl mt-5 z-10 "
                />
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center gap-x-2 ">
            <h1
              onClick={() => navigate("/account/places/new")}
              className="font-medium text-gray-700 cursor-pointer hidden lg:block  hover:bg-gray-100 p-2 rounded-3xl px-3 "
            >
              BeerTNT you home
            </h1>
            <div className="cursor-pointer hidden lg:block hover:bg-gray-100 rounded-full p-2 mr-1 -ml-1 ">
              <BiGlobe className="text-xl  hidden lg:block" />
            </div>
            <Link
              to={user ? "/account" : "/login"}
              className="flex items-center justify-center py-1 border border-gray-300 rounded-full  mr-6 "
            >
              <BiMenu className="text-gray-500 text-2xl ml-4 " />
              {!!user ? (
                <div className="bg-primary text-white px-3 py-1 rounded-full mx-2  ">
                  {user.name.at(0)}
                </div>
              ) : (
                <BiSolidUserCircle className="text-gray-500 text-4xl   mr-2" />
              )}
            </Link>
          </div>
        </header>
      </div>
      <hr className="mt-4 -mb-6 " />
    </>
  );
}
