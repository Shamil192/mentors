const router = require("express").Router();
const User = require("../models/users");

router
  .route("/")
  .get((req, res) => {
    res.render("signup");
  })
  .post(async (req, res) => {
    const { username, email, password } = req.body;
    try {
      if (username && email && password) {
        const user = await User.create({ username, email, password });
        req.session.id = user._id;
        req.session.username = user.username;
      }
      res.redirect("/");
    } catch (error) {
      res.redirect("/");
    }
  });

module.exports = router;
