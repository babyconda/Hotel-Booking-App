import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";

import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import SinglePage from "./pages/SinglePage";

import SingleBooking from "./pages/SingleBooking";
import WishList from "./pages/WishList";

function App() { 

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/:subpage" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/wishlist" element={<WishList />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
          <Route path="/account/bookings/:id" element={<SingleBooking />} />
          <Route
            path="/account/:subpage/:action/:id"
            element={<AccountPage />}
          />
          <Route path="/place/:id" element={<SinglePage />} />
        </Route>
      </Routes>
    </UserContextProvider>  
    
  )
}

export default App
