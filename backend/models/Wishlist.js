const mongoose = require("mongoose");

const whishlistSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
  coords: Object,
  category: String,
});

const WishlistModel = mongoose.model("Wishlist", whishlistSchema);
module.exports = WishlistModel;
