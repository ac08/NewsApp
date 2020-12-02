const db = require('../models');

// // Routes
// // =============================================================
module.exports = (app) => {
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

  //   // PUT route for updating todos. We can get the updated todo data from req.body
  //   app.put("/api/todos", function(req, res) {
  //     // Update takes in an object describing the properties we want to update, and
  //     // we use where to describe which objects we want to update
  //     // update accepts two parameters (data obj and queries condition)
  //     db.Todo.update(
  //       // data from the client using req.body
  //       {
  //       text: req.body.text,
  //       complete: req.body.complete
  //       },
  //     // second parameter queries the database based on where condition
  //       {
  //       where: {
  //         id: req.body.id
  //       }
  //       // returns only the number of attributes affected by the update
  //     }).then(function(rows) {
  //       res.json(rows);
  //     });
  //   });
}; // end module.exports
