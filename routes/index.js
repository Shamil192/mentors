const Mentor = require('../models/mentor');

const IndexRouter = require('express').Router();
IndexRouter.get("/", async (req, res) => {
  const mentorAll = await Mentor.find();
  const mentors = mentorAll.slice(0, 4);

  const uniqueCompetencies = Array.from(new Set(mentorAll.map(x => x.competencies).flat()))
  res.render("index", { mentors, uniqueCompetencies });

});



module.exports = IndexRouter


