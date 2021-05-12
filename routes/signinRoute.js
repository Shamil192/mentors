const router = require("express").Router();
const User = require("../models/users");

router
  .route("/")
  .get((req, res) => {
    res.render("signin");
  })
  .post(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password == password) {
      req.session.username = user.username;
      res.redirect("/");
    }
  });

module.exports = router;
