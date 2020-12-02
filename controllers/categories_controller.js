const express = require('express');
const debug = require('debug')('app:categories_controller');

const router = express.Router();
const db = require('../models');

// GET Route to view single Category by name and include its associated Users
router.get('/view/:category', (req, res) => {
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
    })
    .catch((err) => {
      debug(err);
      res.status(404).send(err);
    });
});

// GET Route to retreive each Category with its associated Users
router.get('/getCategoryUsers', (req, res) => {
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
router.put('/add', (req, res) => {
  db.User.findAll({ where: { full_nm: req.body.full_nm } })
    .then((dbUser) => {
      // updates UserCategories Table
      dbUser[0].addSelected_Categories(['5', '6']);
    })
    // does not return data, send msg to client
    .then(() => {
      res.send('Categories added to selected user');
    })
    .catch((err) => {
      debug(err);
      res.status(404).send(err);
    });
});

module.exports = router;
