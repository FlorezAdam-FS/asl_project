const express = require("express");
const choiceRouter = express.Router();
const { Choice, Question } = require("../models");

// Get choices
choiceRouter.get("/", async (req, res) => {
  const choices = await Choice.findAll({
    include: Question,
  });

  const questions = await Question.findAll();

  res.render("choice/create", { questions: questions });
});

// Post a new question
choiceRouter.post("/", async (req, res) => {
  const choice = await Choice.create(req.body);
  console.log(req.body.isCorrect);
  res.redirect("/choices");
});

// get choice by ID
choiceRouter.get("/:id", async (req, res) => {
  const choice = await Choice.findByPk(Number(req.params.id), {
    include: Question,
  });
  res.json(choice.Quiz);
});

// update choice
choiceRouter.post("/:id", async (req, res) => {
  var choice = await Choice.update(req.body, {
    where: { id: Number(req.params.id) },
  });
  var choice = await Choice.findByPk(Number(req.params.id));
  res.json(choice);
});

// Delete specific choice
choiceRouter.delete("/:id", async (req, res) => {
  const deleted = await Choice.destroy({
    where: { id: Number(req.params.id) },
  });
  res.json(deleted);
});

module.exports = choiceRouter;
