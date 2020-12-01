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
// require('./controllers/users_controller.js')(app);
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
      console.log(err);
      res.status(404).send(err);
    });
});

app.put('/api/addCategory', (req, res) => {
  db.User.findAll({ where: { full_nm: req.body.full_nm } })
    .then((User) => {
      User.addSelected_Categories(['5', '6']);
    }).then((data) => {
      console.log(data);
      res.send('Categories added to selected user');
    }).catch((err) => {
      console.log(err);
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
app.get('/api/getUsers', (req, res) => {
  db.User.findAll({
    where: { full_nm: 'Andrew Circelli' }
    // include: [{
    //   model: db.Category,
    //   as: 'All_Categories',
    //   attributes: ['category']
    // }]
  })
    .then((dbUser) => {
      res.json(dbUser);
    });
});

// doesn't work because must use postRoute to create
// app.use('/', async (req, res) => {
//   const dbUser = await db.User.findAll({
//     where: { full_nm: 'Andrew Circelli' }
//   });
//   const dbCategory = await db.Category.create({
//     category: req.body.category
//   });
//   dbUser.setSelected_Categories([dbCategory.id]);
// });

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      debug(`listening on PORT ${chalk.green(PORT)}`);
    });
  });

// { force: true }
