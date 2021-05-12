const router = require("express").Router();
const Todo = require("../models/todo");

const protect = (req, res, next) => {
  if (!req.session.username) {
    res.redirect("/signin");
  }
  next();
};

router
  .route("/")
  .get(protect, async (req, res) => {
   const todoList = await Todo.find()
    res.render("secret", {todoList});
  })
  .post(async (req, res) => {
    const title = req.body.title
    if (title) {
      await Todo.create({title: title})
      res.redirect('/secret')
    }
  });

module.exports = router;
