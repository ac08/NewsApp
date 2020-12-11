const express = require('express');
const articleController = require('../controllers/article-controller');
const newsService = require('../services/newsService');

const articleRouter = express.Router();

const articles = [
  {
    id: 1,
    source_nm: 'New York Times',
    title: 'NYT Article Title',
    url: 'www.NYT.com',
    urlToImage: 'www.NYT.com',
    publishedAt: '2020-12-09T22:21:00Z',
    content: 'This is the content or description of the article.'
  },
  {
    id: 2,
    source_nm: 'Boston Globe',
    title: 'Boston Globe Article Title',
    url: 'www.BostonGlobe.com',
    urlToImage: 'www.BostonGlobe.com',
    publishedAt: '2020-12-09T22:21:00Z',
    content: 'This is the content or description of the article.'
  }
];

function router(nav) {
  const { getIndex, getByCategory, middleware } = articleController(nav, articles, newsService);
  articleRouter.use(middleware);
  articleRouter.route('/')
    .get(getIndex);
  articleRouter.route('/:category')
    .get(getByCategory);

  return articleRouter;
}

module.exports = router;

// save articles that you like from the categories that you have already selected
