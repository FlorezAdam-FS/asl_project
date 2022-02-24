import React from "react";
import hero from "./images/hero.svg";

const Login = () => {
  //  Login screen before a user can see anything.
  return (
    <div className="flex align-items-center justify-center ">
      <div className="mx-auto w-1/2 p-8 bg-slate-200 max-w-[500px] min-w-[400px] rounded-xl shadow-lg relative pb-8">
        <img src={hero} alt="hero" className="p-5 w-[400px] mx-auto" />
        <h1 className="text-6xl font-bold text-center my-4">Quiz Central</h1>
        <p className="mb-20 p-3 text-center">
          To login, you must login with Github. Please click the button below to
          get started!
        </p>
        <a
          className="w-[400px] p-3 bg-blue-600 text-blue-100 rounded-lg"
          href="https://github.com/login/oauth/authorize?client_id=206a25848ed8116c291e"
        >
          Login With Github
        </a>
      </div>
    </div>
  );
};

export default Login;
