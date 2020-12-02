// Dependencies
// =============================================================
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

// Sets up the Express App
// =============================================================
const PORT = process.env.PORT || 8080;
const app = express();

// Sets up Morgan tool
app.use(morgan('tiny'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sets up the Express app to establish a static directory to access static files
app.use(express.static(path.join(__dirname, '/public/')));

// Serve HTML file for test purposes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/', '/index.html'));
});

// Serve the corresponding node_modules folder if file is not found in public
// Allows work offline without reliance on CDN
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

// Sets up template engine and defaultLayout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', __dirname, '/views');

// Requiring our models for syncing
const db = require('./models');

// Routes
// =============================================================
require('./controllers/banner_controller')(app);

// Middleware
// =============================================================
const userRouter = require('./controllers/users_controller');
const categoryRouter = require('./controllers/categories_controller');

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
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
      { category: 'business' },
      { category: 'entertainment' },
      { category: 'general' },
      { category: 'health' },
      { category: 'science' },
      { category: 'sports' },
      { category: 'technology' }
    ]);
  })
  // TEST User.create and setSelected_Categories
  .then(() => {
    db.User.create({
      first_nm: 'Andrew',
      last_nm: 'Circelli',
      country_cd: 'us'
    })
      .then((user) => {
        user.setSelected_Categories(['1', '2']);
      });
  })
  .then(() => {
    app.listen(PORT, () => {
      debug(`listening on PORT ${chalk.green(PORT)}`);
    });
  });

// // { force: true }
