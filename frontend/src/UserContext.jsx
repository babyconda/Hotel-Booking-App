import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const [startDate, setStateDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [selecter, setSelecter] = useState("");
  const [allPlaces, setAllPlaces] = useState([]);
  const [allFilterPlaces, setAllFilterPlaces] = useState([]);
  let [loadingSpin, setLoadingSpin] = useState(true);


  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfoAirbnb"));
    setUser(userInfo);
    setLoading(true);
    setRedirect(null);
  }, [navigate]);

  const getWishList = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/wishlist/${id}`, config);
      setWishList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      getWishList(user._id);
    }
  }, [user]);

  const filterByCategory = (categoryName) => {
    navigate(`/${categoryName}`);
    setSelecter(categoryName);
    setAllFilterPlaces(
      allPlaces.filter((place) => place.category === categoryName)
    );
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setAllFilterPlaces(allPlaces);
      setSelecter("");
    }
  }, [location.pathname]);

  const addToWishList = async (place) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axios
        .post(
          `/wishlist`,
          {
            place,
            email: user.email,
          },
          config
        )
        .then(() => {
          getWishList(user._id);
        });
        toast.success("Added to WishList...");
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishList = async (placeId) => {
    try {
      if (user) {
        const email = user.email;
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        axios
          .put("/wishlist/delete", {
            email,
            placeId,
          })
          .then(() => {
            getWishList(user._id);
          });
          toast.error("Removed from WishList...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,
        redirect,
        setRedirect,
        showAllPhotos,
        setShowAllPhotos,
        startDate,
        setStateDate,
        endDate,
        setEndDate,
        showDatePicker,
        setShowDatePicker,
        wishList,
        setWishList,
        getWishList,
        selecter,
        setSelecter,
        filterByCategory,
        allPlaces,
        setAllPlaces,
        allFilterPlaces,
        setAllFilterPlaces,
        removeWishList,
        addToWishList,
        loadingSpin, setLoadingSpin
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
