const Place = require("../models/PlaceModal");

const getPlaces = async (req, res) => {
  const id = req.params.id;
  res.json(await Place.find({ owner: id }));
};

const getMyPlaces = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

const updatePlaces = async (req, res) => {
  const {
    id,
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
    category,
  } = req.body;

  await Place.findByIdAndUpdate(
    id,
    {
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
      category,
    },
    { new: true }
  );

  res.json("ok");
};

const getAllPlaces = async (req, res) => {
  res.json(await Place.find());
};

const getSinglePlace = async (req, res) => {
  const { id } = req.params;

  res.json(await Place.findById(id));
};

const deleteProperty = async (req, res) => {
  const { id } = req.params;
  await Place.findByIdAndDelete(id);
  res.status(200);
};

module.exports = {
  getPlaces,
  getMyPlaces,
  updatePlaces,
  getAllPlaces,
  getSinglePlace,
  deleteProperty,
};
