
const express = require('express');
const logger = require('morgan');
const path = require('path');

const hbs = require('hbs');
const session = require('express-session');
const cors = require('cors');
const { sessionConfig } = require('./ServDB/config');
const { resLocals, createErr, cathErrAndSendAnswer } = require('./middleware/resLocals');
const mentorRouter = require('./routes/mentorRouter');
const IndexRouter = require('./routes/index')
const app = express();

app.set("trust proxy", 1);
app.set('view engine', 'hbs');
app.set('cookieName', 'sid');
app.set('views', path.join(process.env.PWD, 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
// app.set('views', path.join(process.cwd() + '/views'));
// app.use(express.static(path.join(process.cwd() + '/public')));

app.use(session(sessionConfig));
app.use(logger('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(resLocals);

app.use((req, res, next) => {
  res.locals.mentorId = req.session?.mentor?.id;
  next();
});

app.use('/mentor', mentorRouter);
app.use('/', IndexRouter)


app.use(createErr);
app.use(cathErrAndSendAnswer);

module.exports = app;
