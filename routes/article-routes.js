const express = require('express');

const NewsAPI = require('newsapi');
require('dotenv').config();

const newsapi = new NewsAPI(process.env.NEWSAPIKEY);
const debug = require('debug')('app:articleRouter');

const articleRouter = express.Router();

function router(nav) {
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
  articleRouter.route('/')
    .get((req, res) => {
      res.render('articles', { nav, articles });
    });
  articleRouter.route('/:category')
    .get((req, res) => {
      const { category } = req.params;
      debug(category);
      (async function topHeadlines() {
        const data = await newsapi.v2.topHeadlines({
          category,
          country: 'us',
          pageSize: 6,
          language: 'en'
        });
        const { articles } = data;
        res.render('articles', { nav, articles });
      }());
    });
  return articleRouter;
}

module.exports = router;

// save articles that you like from the categories that you have already selected
