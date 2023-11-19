import React, { useContext, useEffect } from "react";
import axios from "axios";

import PlaceCategory from "../PlaceCategory";

import { UserContext } from "../UserContext";
import MainCard from "../components/MainCard";
import PageLoader from "../components/PageLoader";

export default function IndexPage() {

  const {
    wishList,
    selecter,
    setSelecter,
    filterByCategory,
    setAllPlaces,
    allFilterPlaces,
    setAllFilterPlaces,
    allPlaces,
    loadingSpin, setLoadingSpin
  } = useContext(UserContext);

  useEffect(() => {
    axios.get("/allplaces").then((response) => {
      setAllPlaces(response.data);
      setAllFilterPlaces(response.data);
      setLoadingSpin(false);
    });  
  }, []);

  return (
    <>  
      <div className="mt-8 -mb-8  ">
        <PlaceCategory
          selecter={selecter}
          setSelecter={setSelecter}
          filterByCategory={filterByCategory}
        />
      </div>

     
   <PageLoader loading ={loadingSpin} setLoading={setLoadingSpin}/>
   
      <div className="pl-4 pt-6 md:p-8 mt-4 grid gap-x-6 gap-y-8  grid-cols-1 md:grid-cols-3 lg:grid-cols-4  ">
        {allFilterPlaces.length > 0 &&
          allFilterPlaces.map((place) => (
            <MainCard key={place._id} place={place} wishList={wishList} />
          ))}
      </div>
      </> 
      

  );
}
