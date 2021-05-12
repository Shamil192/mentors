const router = require("express").Router();

router.get("/", (req, res) => {
  req.session.destroy();
  res.clearCookie("sid_name");
  res.redirect("/");
});

module.exports = router;
