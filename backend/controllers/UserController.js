const User = require("../models/User");
const generateToken = require("../config/generateToken");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password,
    });
    res.json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // console.log("User found");
  }
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};

const myWishList = async (req, res) => {
  const { place, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const { wishList } = user;
      const alreadyWished = wishList.find(({ _id }) => _id === place._id);
      if (!alreadyWished) {
        await User.findByIdAndUpdate(
          user._id,
          {
            wishList: [...user.wishList, place],
          },
          { new: true }
        );
      } else
        return res.json({ msg: "Property already added to the wishlist list" });
    }
    return res.json({ msg: "Place added successfully" });
  } catch (error) {
    return res.json({ msg: "Error adding Property" });
  }
};

const getWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      res.json(user.wishList);
    } else return res.json({ msg: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

const removeFromWishList = async (req, res) => {
  try {
    const { email, placeId } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      const { wishList } = user;

      const wishListAvailable = wishList.find(({ _id }) => _id === placeId);
      if (!wishListAvailable) res.status(400).send({ msg: "Place not Found!" });

      let tempWishList = [];
      for (let i = 0; i < wishList.length; i++) {
        if (wishList[i]._id != placeId) tempWishList.push(wishList[i]);
      }

      await User.findByIdAndUpdate(
        user._id,
        {
          wishList: tempWishList,
        },
        {
          new: true,
        }
      );
      return res.json({ msg: "Place Deleted", wishList });
    } else return res.json({ msg: "User not found" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  authUser,
  myWishList,
  getWishList,
  removeFromWishList,
};
