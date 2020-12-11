const debug = require('debug')('app:articleController');

function articleController(nav, articles, newsService) {
  function getIndex(req, res) {
    res.render('articles', { nav, articles });
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
    getIndex,
    getByCategory,
    middleware
  };
}

module.exports = articleController;
