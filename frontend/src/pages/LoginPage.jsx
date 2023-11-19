import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 


  const recruiterLogin = (e) => {
    e.preventDefault();
    setEmail("recruiter@example.com");    
    setPassword("123456")
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/login", { email, password }, config);
      localStorage.setItem("userInfoAirbnb", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grow flex flex-col items-center justify-center ml-6 md:ml-0 mt-8">
      <div className="mb-60">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="primary">Login</button>
          <button className="primary" onClick={recruiterLogin}>Recruiter's Login</button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
