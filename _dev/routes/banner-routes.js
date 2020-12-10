const NewsAPI = require('newsapi');
require('dotenv').config();

const newsapi = new NewsAPI(process.env.NEWSAPIKEY);

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but should include one
module.exports = (app) => {
  app.get('/:category/', async (req, res) => {
    const data = await newsapi.v2.topHeadlines({
      category: req.params.category,
      country: 'us',
      pageSize: 9,
      language: 'en'
    });
    const { articles } = data;
    res.render('articles', { articles });
    // res.json(articles);
  });
};
