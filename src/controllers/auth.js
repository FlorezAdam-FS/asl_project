const express = require("express");
const router = express.Router();
const axios = require("axios");
const queryString = require("querystring");
const { LoginToken } = require("../models/index");

// Client ID and Secret to get Token
const client_id = "206a25848ed8116c291e";
const client_secret = "426fbde799097817096e57c1dd26ffd5a444d6af";

// Get Login
router.get("/login", (req, res) => {
  res.render("auth/login");
});

// Post Success
router.post("/success", (req, res) => {
  res.redirect("http://localhost:4000/success");
});

// Get Logout
router.get("/logout", (req, res) => {
  req.session.access_token = "";
  res.redirect("auth/login");
});

// Get the Token
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      code,
      client_id,
      client_secret,
    }
  );
  const { access_token } = queryString.parse(response.data);
  console.log(access_token);
  req.session.access_token = access_token;
  const loginToken = await LoginToken.create({ token: access_token });
  res.redirect("http://localhost:4000?token=" + access_token);
});

// Add Token to session
router.get("/token", async (req, res) => {
  const token = await LoginToken.findOne({
    where: {
      token: req.headers.token,
    },
  });
  if (token) {
    req.session.access_token = req.headers.token;
    res.json(token);
  } else {
    res.json({ token: false });
  }
});

module.exports = router;
