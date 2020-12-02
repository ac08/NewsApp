const express = require('express');

const router = express.Router();
const db = require('../models');

// // Routes
// // =============================================================

// express.Router().route() can be used for chainable routes, meaning
// one API for all the METHODS (GET, PUT, POST)

// GET Route to get single User by Id, and include associated categories
router.route('/view/:id')
  .get((req, res) => {
    (async function queryUser() {
      const { id } = req.params;
      const dbUser = await db.User.findAll({
        where: { id },
        include: [{
          model: db.Category,
          as: 'All_Categories',
          attributes: ['category']
        }]
      });
      res.json(dbUser);
    }());
  });

// POST Route to create single new User and return to the client
router.route('/create')
  .post((req, res) => {
    (async function createUser() {
      const { first_nm } = req.body;
      const { last_nm } = req.body;
      const { country_cd } = req.body;
      const dbUser = await db.User.create({
        first_nm,
        last_nm,
        country_cd
      });
      res.json(dbUser);
    }());
  });

// PUT Route to add 1+ Users by userId to an associated Category
// router.put('/add', (req, res) => {
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
router.route('/getUserCategories')
  .get((req, res) => {
    (async function queryUserCategories() {
      const dbUserCategories = await db.User.findAll({
        attributes: ['full_nm', 'country_cd'],
        include: [{
          model: db.Category,
          as: 'Selected_Categories',
          attributes: ['category'],
          through: { attributes: [] }
        }]
      });
      res.json(dbUserCategories);
    }());
  });

module.exports = router;
