
const express = require('express');
const logger = require('morgan');
const path = require('path');

const hbs = require('hbs');
const session = require('express-session');
const cors = require('cors');
const { sessionConfig } = require('./ServDB/config');
const { resLocals, createErr, cathErrAndSendAnswer } = require('./middleware/resLocals');
const mentorRouter = require('./routes/mentorRouter');

const app = express();

app.set('view engine', 'hbs');
app.set('cookieName', 'sid');
app.set('views', path.join(process.cwd(), 'views'));
hbs.registerPartials(path.join(process.cwd(), 'views', 'partials'));

app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(resLocals);
app.use('/mentor', mentorRouter);
app.get("/", (req, res) => {
  res.render("index");
});
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});
app.use(createErr);

app.use(cathErrAndSendAnswer);

module.exports = app;
