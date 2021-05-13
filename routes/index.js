const Mentor = require('../models/mentor');

const IndexRouter = require('express').Router();
IndexRouter.get("/", async (req, res) => {
  const mentors = await Mentor.find()
  res.render("index", { mentors });
});



module.exports = IndexRouter


