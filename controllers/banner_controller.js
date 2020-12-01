const NewsAPI = require('newsapi');

const newsapi = new NewsAPI('245b93f17234480c8618b219b2cee9e9');

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but should include one
module.exports = (app) => {
  app.get('/api/topHeadlines/:country_cd/:category/', async (req, res) => {
    const data = await newsapi.v2.topHeadlines({
      country: req.params.country_cd,
      category: req.params.category,
      pageSize: 6,
      language: 'en'
    });
    res.json(data.articles);
  });
};
