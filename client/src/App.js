import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Quiz from "./components/Quiz";
import queryString from "querystring";

const App = () => {
  // Getting the Token
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    async function fetchJwt() {
      const params = queryString.parse(
        window.location.search.replace(/^\?/, "")
      );
      localStorage.token = params.token;
      const response = await axios("http://localhost:3000/auth/token/", {
        headers: {
          token: localStorage.token,
        },
      });
      setJwt(response.data.token);
    }
    fetchJwt();
  }, []);
  // If No Token Return Login
  if (!jwt) {
    return (
      <div className="p-8 h-screen bg-slate-900">
        <Login />
      </div>
    );
  }
  // Return the Rest of the Code once You get a Token
  return (
    <Router>
      <div>
        <Navigation isLoggedIn={jwt ? true : false} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/quizzes/:id" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
