// Server.js - This file is the initial starting point for the Node/Express server.

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
// require('./controllers/users_controller.js')(app);

// POST Route to create single new User and return to the client
app.post('/api/createUser', (req, res) => {
  db.User.create({
    first_nm: req.body.first_nm,
    last_nm: req.body.last_nm,
    country_cd: req.body.country_cd
  })
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      // bring out of the message only using map (YT)
      debug(err);
      res.status(404).send(err);
    });
});

// GET Route to get single User by Id, and include associated categories
app.get('/api/getUser/:id', (req, res) => {
  db.User.findAll({
    where: { id: req.params.id },
    include: [{
      model: db.Category,
      as: 'All_Categories',
      attributes: ['category']
    }]
  })
    .then((dbUser) => {
      res.json(dbUser);
    })
    .catch((err) => {
      debug(err);
      res.status(404).send(err);
    });
});

// PUT Route to add 1+ Users by userId to an associated Category
// app.put('/api/addUser', (req, res) => {
//   db.Category.findAll({ where: { category: req.body.category } })
//     .then((dbCategory) => {
//       // updates UserCategories Table
//       dbCategory[0].addAll_Users(['1']);
//     }).then(() => {
//       res.send('User added to selected category');
//     }).catch((err) => {
//       debug(err);
//       res.status(404).send(err);
//     });
// });

// GET Route to retreive each User with their selected Categories
app.get('/api/getUserCategories', (req, res) => {
  db.User.findAll({
    attributes: ['full_nm', 'country_cd'],
    include: [{
      model: db.Category,
      as: 'Selected_Categories',
      attributes: ['category'],
      through: { attributes: [] }
    }]
  })
    .then((output) => {
      res.json(output);
    })
    .catch((err) => {
      debug(err);
      res.status(404).send(err);
    });
});

// GET Route to retreive each Category with its associated Users
app.get('/api/getCategoryUsers', (req, res) => {
  db.Category.findAll({
    attributes: ['category'],
    include: [{
      model: db.User,
      as: 'All_Users',
      attributes: ['full_nm'],
      through: { attributes: [] }
    }]
  })
    .then((output) => {
      res.json(output);
    })
    .catch((err) => {
      debug(err);
      res.status(404).send(err);
    });
});

// PUT Route to add 1+ Categories by categoryId to an associated User
// May have to consider a less dynamic Route, one for each Category
app.put('/api/addCategory', (req, res) => {
  db.User.findAll({ where: { full_nm: req.body.full_nm } })
    .then((dbUser) => {
      // updates UserCategories Table
      dbUser[0].addSelected_Categories(['5', '6']);
    }).then(() => {
      res.send('Categories added to selected user');
    }).catch((err) => {
      debug(err);
      res.status(404).send(err);
    });
});

// GET Route to view single Category by name and include its associated Users
app.get('/api/viewCategory/:category', (req, res) => {
  db.Category.findAll({
    where: { category: req.params.category },
    include: [{
      model: db.User,
      as: 'UserRef',
      attributes: ['full_nm']
    }]
  })
    .then((dbCategory) => {
      res.json(dbCategory);
    }).catch((err) => {
      debug(err);
      res.status(404).send(err);
    });
});

// does not work because you cannot assoicate same category to different users
// possibly create the user (await); then create categories based on user selection
// and addAll_Users using add method
// app.post('/api/createCategory', (req, res) => {
//   db.Category.create({
//     category: req.body.category,
//     userId: req.body.userId
//   })
//     .then((dbCategory) => {
//       res.json(dbCategory);
//     });
// });

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
    }).then((user) => {
      user.setSelected_Categories(['1', '2']);
    });
  })
  .then(() => {
    app.listen(PORT, () => {
      debug(`listening on PORT ${chalk.green(PORT)}`);
    });
  });

// { force: true }
