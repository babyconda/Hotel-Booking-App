import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { RiDeleteBinLine } from "react-icons/ri";
import PageLoader from "./PageLoader";
import { toast } from "react-toastify";

export default function ListedPlaces() {
  const { user, loadingSpin, setLoadingSpin } = useContext(UserContext);
  const [msg, setMsg] = useState(false)


  const [places, setPlaces] = useState([]);
  useEffect(() => {
    setLoadingSpin(true);
  },[])

  const fetchPlaces = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/places/${user._id}`, config);
      setLoadingSpin(false)
      setPlaces(data);
      
      if(data.length === 0){
        setMsg(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id) => {    
    // alert(id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.delete(`/places/${id}`, config);
      toast.error("Property Deleted Successfully...")
      // fetchPlaces();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {      
      fetchPlaces();
    }
  }, [places]);

  return (
    <>
    <div className="-mt-16">
      <PageLoader loading ={loadingSpin} setLoading={setLoadingSpin}/>
    </div>  

    {msg &&
      <h2 className="text-2xl flex justify-center mt-28 mb-40 font-semibold ">You have not listed any Property...</h2>
    }
          

    <div className="mt-24">
      {places.length > 0 &&
        places.map((place, id) => (
          <div className="mb-2 mx-16 relative" key={id}>
            <Link
              to={"/account/places/new/" + place._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-52 h-32  bg-gray-300 grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    className="object-cover w-52"
                    src={place.photos[0]}
                    alt=""
                  />
                )}
              </div>
              <div className="grow-0 shrink-0 w-4/5 ">
                <h2 className="text-xl ">{place.title}</h2>
                <div className="w-full">
                  <p className="text-sm mt-2 ">{place.description}</p>
                </div>
              </div>
            </Link>
            <button
              className="absolute text-2xl mt-1 p-2 bg-white bottom-1 right-2 rounded-lg shadow-lg flex items-center"
              onClick={() => deleteProperty(place._id)}
            >
              <RiDeleteBinLine />
              {/* <h2>Delete</h2> */}
            </button>
          </div>
        ))}
    </div>
    </>
    
  );
}
