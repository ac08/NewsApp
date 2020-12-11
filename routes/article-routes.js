const express = require('express');
const articleController = require('../controllers/article-controller');
const newsService = require('../services/newsService');

const articleRouter = express.Router();

function router(nav) {
  const { getFeed, getByCategory, middleware } = articleController(nav, newsService);
  articleRouter.use(middleware);
  articleRouter.route('/feed')
    .get(getFeed);
  articleRouter.route('/:category')
    .get(getByCategory);

  return articleRouter;
}

module.exports = router;

// save articles that you like from the categories that you have already selected
