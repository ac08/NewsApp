const express = require('express');

const router = express.Router();
const db = require('../../models');

// // Production Routes
// // =============================================================

// express.Router().route() can be used for chainable routes, meaning
// one API for all the METHODS (GET, PUT, POST)

// POST Route to create single new User and return to the client
router.route('/createUserCategories')
  .all((req, res, next) => {
    (async function createUser() {
      const { first_nm } = req.body;
      const { last_nm } = req.body;
      const dbUser = await db.User.create({
        first_nm,
        last_nm
      });
      const categoryIds = [];
      const { selectedCategories } = req.body;
      selectedCategories.forEach((category) => {
        const categoryId = parseInt(category.categoryId);
        categoryIds.push(categoryId);
      });
      req.categoryIds = categoryIds;
      req.userData = dbUser;
      next();
    }());
  })
  .put((req, res) => {
    (async function addCategories() {
      const { full_nm } = req.userData.dataValues;
      const dbUser = await db.User.findAll({
        where: { full_nm }
      });
      // updates UserCategories Table
      dbUser[0].addSelected_Categories(req.categoryIds);
      res.send('Categories added to selected user');
    }());
  });

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

// PUT Route to retreive articles based on user selected categories
// router.route('/articles')
//   .put((req, res) => {
//     const requestObj = req.body;
//     const categoryName = Object.keys(requestObj);
//     (async function topHeadlines() {
//       const data = await newsapi.v2.topHeadlines({
//         category: categoryName,
//         country: 'us',
//         pageSize: 6,
//         language: 'en'
//       });
//       const { articles } = data;
//       // res.render('banner', { articles });
//       res.send(articles);
//     }());
//   });

// // Development Routes
// // =============================================================

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

module.exports = router;
