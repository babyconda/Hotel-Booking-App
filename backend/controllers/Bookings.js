const Booking = require("../models/BookingModal");

const bookPlace = async (req, res) => {
  // console.log(req.body);
  const {
    user,
    place,
    checkIn,
    checkOut,
    owner,
    numberOfGuests,
    name,
    phone,
    price,
  } = req.body;
  const booking = await Booking.create({
    user,
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    owner,
    phone,
    price,
  });
  res.status(201).json(booking);
};

const getBooking = async (req, res) => {
  const { id } = req.params;

  res.json(
    await Booking.find({ $or: [{ user: id }, { owner: id }] }).populate("place")
  );
};

module.exports = {
  bookPlace,
  getBooking,
};
