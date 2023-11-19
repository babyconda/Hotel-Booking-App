import React, { useContext } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage.jsx";
import { AiOutlineUser, AiOutlineMenu } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import ListedPlaces from "../components/ListedPlaces";
import BookingPage from "./BookingPage";

export default function AccountPage() {
  const { user, loading, redirect, setRedirect, getWishList, setWishList } =
    useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const activeClass =
    "flex gap-1 py-2 px-6 items-center bg-primary text-white rounded-full mb-8";
  const deactiveClass =
    "flex gap-1 items-center py-2 px-6 mb-8 bg-gray-300 rounded-full";

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (!loading) {
    return "Loading...";
  }

  if (loading && !user) {
    return <Navigate to={"/login"} />;
  }

  const logoutHandler = () => {
    localStorage.removeItem("userInfoAirbnb");
    setRedirect("/");
    setWishList([]);
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="p-4">
      <nav className="w-full ml-3 flex justify-center mt-8 md:gap-2 gap-1">
        <Link
          className={subpage === "profile" ? activeClass : deactiveClass}
          to={"/account"}
        >
          <AiOutlineUser className="hidden md:block " />
          Profile
        </Link>
        <Link
          className={
            subpage === "bookings" || subpage === "bookings/:id"
              ? activeClass
              : deactiveClass
          }
          to={"/account/bookings"}
        >
          <AiOutlineMenu className="hidden md:block " />
          Bookings
        </Link>
        <Link
          className={subpage === "places" ? activeClass : deactiveClass}
          to={"/account/places"}
        >
          <BiBuildingHouse className="hidden md:block " />
          Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />
          <button className="primary max-w-sm mt-2" onClick={logoutHandler}>
            Logout
          </button>
          <button
            className="bg-primary text-white w-[50%] py-2 rounded-2xl  mt-2"
            onClick={() => navigate("/account/wishlist")}
          >
            My WishList
          </button>
        </div>
      )}
      {subpage === "places" && (
        <>
          <PlacesPage />
          {location.pathname === "/account/places" ? <ListedPlaces /> : <></>}
        </>
      )}
      {subpage === "bookings" && (
        <>
          {location.pathname === "/account/bookings" ? <BookingPage /> : <></>}
        </>
      )}
    </div>
  );
}
