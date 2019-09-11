const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const normalizePort = require('normalize-port');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const config = require('./config/database');
const usersRouter = require('./routes/users');
const indexRouter = require('./routes/index');

const mongoose = require('mongoose');
mongoose.connect(config.database, { useNewUrlParser: true });
require('./config/passport')(passport);

const app = express();
app.use(logger('dev'));

const hbs = handlebars.create({
  defaultLayout: 'layout',
  extname: 'hbs',
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views')
});

const sessionConfig = {
  secret: 'key party',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new FileStore({})
};

app.use(session(sessionConfig));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next) {
  res.locals.user = req.user || null;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
