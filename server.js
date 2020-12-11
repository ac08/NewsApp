// Dependencies
// =============================================================
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Sets up the Express App
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();

// Sets up Morgan tool
app.use(morgan('tiny'));

// Sets up the Express app to handle data parsing and cookie parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // changed to false
app.use(cookieParser());
app.use(session({ secret: 'news' }));

require('./config/passport.js')(app);

// Sets up template engine and defaultLayout
// app.set('views', path.join(__dirname, 'views/layouts/'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the Express app to establish a static directory to access static files
app.use(express.static(path.join(__dirname, '/public/')));

// // Serve the corresponding node_modules folder if file is not found in public
// // Allows work offline without reliance on CDN
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Requiring our models for syncing
const db = require('./models');

const nav = [
  {
    link: '/articles/business',
    title: 'Business'
  },
  {
    link: '/articles/entertainment',
    title: 'Entertainment'
  },
  {
    link: '/articles/general',
    title: 'General',
  },
  {
    link: '/articles/health',
    title: 'Health'
  },
  {
    link: '/articles/science',
    title: 'Science'
  },
  {
    link: '/articles/sports',
    title: 'Sports'
  },
  {
    link: '/articles/technology',
    title: 'Technology'
  }
];

// Routes
// =============================================================
const authRouter = require('./routes/auth-routes')(nav);
const indexRouter = require('./routes/index-routes')(nav);
const articleRouter = require('./routes/article-routes')(nav);
const adminRouter = require('./routes/admin-routes')(nav);

app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/articles', articleRouter);
app.use('/', indexRouter);

// Addn'l Middleware (something that is executed when everything comes in...)
// =============================================================
app.use((req, res, next) => {
  const err = new Error('Page Not Found!');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  // assign error status to the error that has been passed from the above middleware
  // or if the error originated in another portion of app, assign 500 (Internal Server Error) status
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message
    }
  });
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize
  .sync({ force: true })
  .then(() => {
    db.Category.bulkCreate([
      { category: 'Business' },
      { category: 'Entertainment' },
      { category: 'General' },
      { category: 'Health' },
      { category: 'Science' },
      { category: 'Sports' },
      { category: 'Technology' }
    ]);
  })
  .then(() => {
    app.listen(PORT, () => {
      debug(`listening on PORT ${chalk.green(PORT)}`);
    });
  })
  .catch((err) => {
    debug(err);
  });
