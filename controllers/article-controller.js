const debug = require('debug')('app:articleController');
const db = require('../models');

function articleController(nav, newsService) {
  function getFeed(req, res) {
    const { id } = req.user;
    (async function findCategories() {
      const dbCategories = await db.Category.findAll({
        where: {
          userId: id
        }
      });
      const articles = [];
      for (let i = 0; i < dbCategories.length; i++) {
        const selectedCategory = dbCategories[i].dataValues.category;
        const selectedArticles = await newsService.myTopHeadlines(selectedCategory);
        selectedArticles.forEach((articleEl) => {
          articles.push(articleEl);
        });
      }
      res.render('articles', { nav, articles });
    }());
  }

  function getSavedFeed(req, res) {
    const { id } = req.user;
    (async function findSavedArticles() {
      const dbArticles = await db.Article.findAll({
        where: {
          userId: id
        }
      });
      debug(dbArticles);
      const articles = dbArticles;
      // create new view for MyFeed without Save button etc.
      res.render('feed', { nav, articles });
    }());
  }

  function getByCategory(req, res) {
    const { category } = req.params;
    (async function api() {
      const articles = await newsService.myTopHeadlines(category);
      res.render('articles', { nav, articles });
    }());
  }
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      debug('must have a user account created');
      res.redirect('/');
    }
  }
  return {
    getFeed,
    getByCategory,
    middleware,
    getSavedFeed
  };
}

module.exports = articleController;
