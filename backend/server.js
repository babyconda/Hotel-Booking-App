const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
  registerUser,
  authUser,
  myWishList,
  getWishList,
  removeFromWishList,
} = require("./controllers/UserController");
const {
  uploadNewPlaces,
} = require("./controllers/UploadsController");

const { protect } = require("./middleware/authMiddleware");
const {
  getPlaces,
  getMyPlaces,
  updatePlaces,
  getAllPlaces,
  getSinglePlace,
  deleteProperty,
} = require("./controllers/GetPlacesControllers");
const { bookPlace, getBooking } = require("./controllers/Bookings");
const path = require("path");
const connectDB = require("./config/db");
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5600;

connectDB();

app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.json());



app.post("/register", registerUser);
app.post("/login", authUser);
app.post("/places", (protect, uploadNewPlaces));
app.post("/wishlist", (protect, myWishList));
app.get("/wishlist/:id", (protect, getWishList));
app.put("/wishlist/delete", removeFromWishList); 
app.put("/places", (protect, updatePlaces));
app.delete("/places/:id", (protect, deleteProperty));
app.get("/places/:id", (protect, getPlaces));
app.get("/places/myplace/:id", getMyPlaces);
app.get("/allplaces", getAllPlaces);
app.get("/place/:id", getSinglePlace);
app.post("/bookings", bookPlace);
app.get("/bookings/:id", getBooking);


// ------------------Development--------------

const __dirname1 = path.resolve();
if(process.env.NODEENV==='production'){
  app.use(express.static(path.join(__dirname1, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  });

}else{
  app.get("/", (req, res) => {
    res.send("API is running Successfully");
  });

}

// ------------------Development--------------

app.listen(PORT, () => console.log(`Server Started at port ${PORT}`));
