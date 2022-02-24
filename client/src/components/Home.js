import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import queryString from "querystring";

const Home = () => {
  // Create Array of Quizzes
  const [quizzes, setQuizzes] = useState([]);
  // Get Quizzes
  useEffect(() => {
    async function fetchQuizes() {
      const params = queryString.parse(
        window.location.search.replace(/^\?/, "")
      );
      // console.log(params);
      const response = await axios.get("http://localhost:3000/quizzes", {
        headers: {
          token: params.token,
          content: "application/json",
        },
      });
      console.log(response);
      setQuizzes(response.data);
    }
    fetchQuizes();
  }, []);

  return (
    <div class="bg-slate-900 p-8 text-white  h-screen">
      <h1 className="text-3xl mb-3">Take a Quiz!</h1>
      <p className="text-2xl mb-8">
        Click on any quiz listed below to take one.
      </p>
      <ul>
        {quizzes.map((q) => (
          // Return of list of links to each quiz
          <li className="mb-8">
            <Link
              className="p-3 bg-blue-300 w-[500px] mx-auto rounded-lg shadow-lg ease-in duration-300 cursor-pointer text-blue-900 origin-left hover:bg-slate-500 hover:text-white"
              to={"/quizzes/" + q.id}
            >
              {q.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
