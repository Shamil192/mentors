
const IndexRouter = require('express').Router();
IndexRouter.get("/", (req, res) => {
  res.render("index");
});

// IndexRouter.post('/', upload.single('avatar'), async (req, res) => {
// })

module.exports = IndexRouter

