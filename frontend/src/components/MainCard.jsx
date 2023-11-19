import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { UserContext } from "../UserContext";

export default function MainCard({ place }) {
  const { removeWishList, wishList, addToWishList, user } =
    useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div key={place._id} className="relative mt-5 ">
      <Link
        to={`/place/${place._id}`}
        className="bg-gray-500 mb-2 rounded-2xl  flex  "
      >
        {place.photos?.[0] && (
          <img
            className="rounded-2xl  object-cover aspect-square"
            src={place.photos?.[0]}
            alt="Main image of property"
          />
        )}
      </Link>

      {wishList?.some((item) => item._id === place._id) ? (
        <div
          className=" absolute text-2xl right-4 top-4 text-primary hover:cursor-pointer hover:scale-110"
          onClick={() => removeWishList(place._id)}
        >
          <AiFillHeart />
        </div>
      ) : (
        <div
          className=" absolute text-2xl right-4 top-4 text-black/60 hover:cursor-pointer hover:scale-110"
          onClick={() => {
            user ? addToWishList(place) : navigate("/login");
          }}
        >
          <AiFillHeart />
        </div>
      )}
      {location.pathname === "/account/wishlist" ? (
        <div
          className=" absolute text-2xl right-4 top-4 text-primary hover:cursor-pointer hover:scale-110"
          onClick={() => removeWishList(place._id)}
        >
          <AiFillHeart />
        </div>
      ) : (
        <></>
      )}
      <Link to={`/place/${place._id}`}>
        <div className="font-semibold  ">{place.address}</div>
        <div className="text-sm text-gray-500 ">{place.title}</div>
        <div className=" flex items-center mt-1 underline absolute -bottom-5 ">
          &#8377;
          <span className="font-semibold ">{place.price}</span>
          <h3 className="ml-1  ">total before taxes</h3>
        </div>
      </Link>
    </div>
  );
}
