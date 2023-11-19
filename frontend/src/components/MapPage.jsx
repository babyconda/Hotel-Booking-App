import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import { Icon, divIcon, point } from "leaflet";

export default function MapPage({ place, latitude, longitude }) {  

  const customIcon = new Icon({  
  iconUrl: require("./icons/placeholder.png"),
  iconSize: [58, 58]
});


  return (
    <div className="w-100 h-50   mt-8 ">
     <MapContainer center={[latitude, longitude]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=2esxS6cLQSWe3JqVZcXb"
        />

         
          <Marker position={[latitude, longitude]} icon={customIcon}>
            <Popup>
               <img
              src={place?.photos[0]}
              alt="MainImage"
              className="w-full  "
            />
            <h2 className="w-40 text-lg mt-2 font-semibold">
              {place.address.slice(0, 15)}
            </h2>
            <h2 className="w-40 text-lg ">
              <span className="font-semibold">&#8377;{place.price}</span> / per
              night
            </h2>
            </Popup>
            {/* <Popup>{marker.popUp}</Popup> */}
          </Marker>
       
      
      </MapContainer>
    </div>
  );
}

//https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=2esxS6cLQSWe3JqVZcXb
