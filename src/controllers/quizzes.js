const express = require("express");
const quizCtlr = express.Router();
const { Quiz, Question, Choice } = require("../models/index");
const { quizzIsValid } = require("../middlewares/forms");

// Get all quizzes
quizCtlr.get("/", async (req, res) => {
  const quizzes = await Quiz.findAll({
    include: [{ model: Question, include: [Choice] }],
  });
  res.json(quizzes);
});

// Add new quiz
quizCtlr.post("/", quizzIsValid, async (req, res) => {
  if (req.errors.length > 0) {
    res.render("quizzes/create", {
      errors: req.errors,
    });
  } else {
    const quiz = await Quiz.create(req.body);
    res.redirect("/quizzes");
  }
});

// Create new quiz with form
quizCtlr.get("/new", async (req, res) => {
  res.render("quiz/create");
});

// Get specific quiz by ID
quizCtlr.get("/:id", async (req, res) => {
  const quiz = await Quiz.findByPk(Number(req.params.id), {
    include: [{ model: Question, include: [Choice] }],
  });
  res.json(quiz);
});

// Update specific quiz
quizCtlr.post("/:id", quizzIsValid, async (req, res) => {
  if (req.errors.length === 0) {
    var quiz = await Quiz.update(req.body, {
      where: { id: Number(req.params.id) },
    });
  }
  var quiz = await Quiz.findByPk(Number(req.params.id));
  res.render("quizzes/edit", { quiz, errors: req.errors });
});

// get specific quiz and edit
quizCtlr.get("/:id/edit", async (req, res) => {
  var quiz = await Quiz.update(req.body, {
    where: { id: Number(req.params.id) },
  });
  var quiz = await Quiz.findByPk(Number(req.params.id));
  res.render("quizzes/edit", { quiz });
});

// Delete specific quiz
quizCtlr.get("/:id/delete", async (req, res) => {
  const deleted = await Quiz.destroy({
    where: { id: Number(req.params.id) },
  });
  res.redirect("/quizzes");
});

module.exports = quizCtlr;
