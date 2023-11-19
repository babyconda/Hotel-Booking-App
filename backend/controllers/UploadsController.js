const fs = require("fs");
const Place = require("../models/PlaceModal");

const uploadNewPlaces = async (req, res) => {
  
  const {
    _id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    coords,
    category
  } = req.body;


  const placeDoc = await Place.create({
    owner: _id,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    coords,
    category
  });

  res.json(placeDoc);
};

module.exports = { uploadNewPlaces };
