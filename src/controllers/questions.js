const express = require("express");
const questionCtlr = express.Router();
const { Question, Quiz } = require("../models");

// Get all questions
questionCtlr.get("/", async (req, res) => {
  const questions = await Question.findAll({
    include: Quiz,
  });
  const quizzes = await Quiz.findAll();
  // res.json(questions);
  res.render("question/create", { quizzes: quizzes });
});

// Post new question
questionCtlr.post("/", async (req, res) => {
  const question = await Question.create(req.body);
  res.redirect("/questions");
});

// Get question by ID
questionCtlr.get("/:id", async (req, res) => {
  const question = await Question.findByPk(Number(req.params.id), {
    include: Quiz,
  });
  res.json(question.Quiz);
});

// Update specific question
questionCtlr.post("/:id", async (req, res) => {
  var question = await Question.update(req.body, {
    where: { id: Number(req.params.id) },
  });
  var question = await Question.findByPk(Number(req.params.id));
  res.json(question);
});

// Delete specific question
questionCtlr.delete("/:id", async (req, res) => {
  const deleted = await Question.destroy({
    where: { id: Number(req.params.id) },
  });
  res.json(deleted);
});

module.exports = questionCtlr;
