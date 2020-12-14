const express = require('express');
const articleController = require('../controllers/article-controller');
const newsService = require('../services/newsService');

const articleRouter = express.Router();

function router(nav) {
  const {
    getFeed, getSavedFeed, getByCategory, middleware
  } = articleController(nav, newsService);
  articleRouter.use(middleware);
  articleRouter.route('/feed')
    .get(getFeed);
  articleRouter.route('/saved/feed')
    .get(getSavedFeed);
  articleRouter.route('/:category')
    .get(getByCategory);

  return articleRouter;
}

module.exports = router;
