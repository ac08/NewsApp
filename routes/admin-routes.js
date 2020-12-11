const express = require('express');
const debug = require('debug')('app:adminRouter');

const db = require('../models');

const adminRouter = express.Router();

function router(nav) {
  adminRouter.route('/categories')
    .get(async (req, res) => {
      const dbCategories = await db.Category.findAll({
        attributes: ['id', 'category']
      });
      res.render('categories', { nav, dbCategories });
    });
  adminRouter.route('/usercategories')
    .all((req, res, next) => {
      const { categoryId } = req.body;
      const { username } = req.user;
      (async function updateUserCategoriesTable() {
        const dbUser = await db.User.findAll({
          where: { username }
        });
        dbUser[0].addSelected_Categories(categoryId);
        debug('updated user categories table');
        next();
      }());
    })
    .put((req, res) => {
      (async function updateCategoriesTable() {
        const { categoryId } = req.body;
        const { id } = req.user;
        const dbCategory = await db.Category.update({
          userId: id
        },
        {
          where: { id: categoryId }
        });
        debug('updated categories table');
      }());
    });
  return adminRouter;
}

module.exports = router;
