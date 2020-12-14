const debug = require('debug')('app:adminController');
const db = require('../models');

function adminController(nav) {
  async function getCategories(req, res) {
    const dbCategories = await db.Category.findAll({
      attributes: ['id', 'category']
    });
    res.render('categories', { nav, dbCategories });
  }
  function setUserCategories(req, res, next) {
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
  }
  function updateUserCategories(req, res) {
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
  }
  function saveArticles(req, res) {
    (async function saveSelectedArticles() {
      const {
        source_nm, title, description, url, urlToImage, publishedAt
      } = req.body;
      const { id } = req.user;
      const dbArticle = await db.Article.create({
        userId: id,
        source_nm,
        title,
        description,
        url,
        urlToImage,
        publishedAt
      });
      debug('updated articles table');
    }());
  }

  // revealing module pattern
  return {
    getCategories,
    setUserCategories,
    updateUserCategories,
    saveArticles
  };
}

module.exports = adminController;
