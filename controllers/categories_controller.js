const express = require('express');

const router = express.Router();
const db = require('../models');

// GET Route to view single Category by name and include its associated Users
router.route('/view/:category')
  .get((req, res) => {
    (async function query() {
      const dbCategory = await db.Category.findAll({
        where: { category: req.params.category },
        include: [{
          model: db.User,
          as: 'UserRef',
          attributes: ['full_nm']
        }]
      });
      res.json(dbCategory);
    }());
  });

// GET Route to retreive each Category with its associated Users
router.route('/getCategoryUsers')
  .get((req, res) => {
    (async function query() {
      const dbCategoryUsers = await db.Category.findAll({
        attributes: ['category'],
        include: [{
          model: db.User,
          as: 'All_Users',
          attributes: ['full_nm'],
          through: { attributes: [] }
        }]
      });
      res.json(dbCategoryUsers);
    }());
  });

// PUT Route to add 1+ Categories by categoryId to an associated User
// May have to consider a less dynamic Route, one for each Category
router.route('/add/:id')
  .get((req, res) => {
    (async function queryUser() {
      const { id } = req.params;
      const dbUser = await db.User.findAll({
        where: { id }
      });
      res.json(dbUser);
    }());
  })
  .put((req, res) => {
    (async function addCategories() {
      const { id } = req.params;
      // const { full_nm } = req.body;
      const dbUser = await db.User.findAll({
        where: { full_nm: 'Andrew Circelli' }
      });
      // updates UserCategories Table
      dbUser[0].addSelected_Categories([id]);
      res.send('Categories added to selected user');
    }());
  });

module.exports = router;
