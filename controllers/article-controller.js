const NewsAPI = require('newsapi');
require('dotenv').config();

const newsapi = new NewsAPI(process.env.NEWSAPIKEY);
const debug = require('debug')('app:articleController');

function articleController(nav, articles, newsService) {
  function getIndex(req, res) {
    res.render('articles', { nav, articles });
  }

  function getByCategory(req, res) {
    const { category } = req.params;
    (async function topHeadlines() {
      const data = await newsapi.v2.topHeadlines({
        category,
        country: 'us',
        pageSize: 6,
        language: 'en'
      });
      const { articles } = data;
      debug(articles);
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
    getIndex,
    getByCategory,
    middleware
  };
}

module.exports = articleController;
