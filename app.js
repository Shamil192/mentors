const express = require("express");
const mongoose = require("mongoose");
const chalk = require("chalk");
const morgan = require("morgan");
const path = require("path");
const hbs = require("hbs");
const session = require("express-session");
const mongoUrl = 'mongodb://localhost:27017/session'
const MongoStore = require('connect-mongo');


const signupRoute = require("./routes/signupRoute");
const signinRoute = require("./routes/signinRoute");
const logoutRoute = require("./routes/logoutRoute");
const secretRoute = require('./routes/secretRoute')


const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(process.env.PWD, "views"));
hbs.registerPartials(path.join(process.env.PWD, "views", "partials"));

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: MongoStore.create({ mongoUrl }),
    secret: "keyboardhhhgf",
    resave: false,
    key: 'sid_name',
    saveUninitialized: false,
    cookie: { secure: false, /*expires: 7e3 * 10*/ },
  })
);

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});



app.get("/", (req, res) => {
  res.render("index");
});

app.use("/signup", signupRoute);
app.use("/signin", signinRoute);
app.use("/logout", logoutRoute);
app.use('/secret', secretRoute)


app.listen(3000, () => {
  console.log(chalk.green("Стартануло слава тебе хоспаде"));
  mongoose.connect(
    "mongodb://localhost:27017/blog",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log(chalk.green("Спаси и сохрани"));
    }
  );
});



