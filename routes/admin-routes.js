const express = require('express');
const adminController = require('../controllers/admin-controller');

const db = require('../models');

const adminRouter = express.Router();

function router(nav) {
  const {
    getCategories, setUserCategories, updateUserCategories, saveArticles
  } = adminController(nav);
  adminRouter.route('/categories')
    .get(getCategories);
  adminRouter.route('/usercategories')
    .all(setUserCategories)
    .put(updateUserCategories);
  adminRouter.route('/save')
    .post(saveArticles);
  return adminRouter;
}

module.exports = router;
