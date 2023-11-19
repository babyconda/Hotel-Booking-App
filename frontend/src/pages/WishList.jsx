import React, { useContext} from "react";
import MainCard from "../components/MainCard";
import { UserContext } from "../UserContext";

export default function WishList() {
  const { wishList } = useContext(UserContext);

  return (
    <>
      {wishList.length > 0 ? (
        <div className=" p-8 mt-4 grid gap-x-6 gap-y-8  grid-cols-1 md:grid-cols-3 lg:grid-cols-4  ">
          {wishList.map((place) => (
            <MainCard key={place._id} place={place} />
          ))}
        </div>
      ) : (
        <div className="my-20 pt-11 ml-6 flex items-center justify-center text-2xl font-semibold">
          <h1>Sorry, No property is in your wish list....!</h1>
        </div>
      )}
    </>
  );
}
