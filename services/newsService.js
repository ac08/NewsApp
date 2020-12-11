const NewsAPI = require('newsapi');
require('dotenv').config();

const newsapi = new NewsAPI(process.env.NEWSAPIKEY);
const debug = require('debug')('app:articleController');

function newsService() {
  function myTopHeadlines(category) {
    return new Promise((resolve, reject) => {
      newsapi.v2.topHeadlines({
        category,
        country: 'us',
        pageSize: 3,
        language: 'en'
      })
        .then((response) => {
          const { articles } = response;
          resolve(articles);
        })
        .catch((err) => {
          reject(err);
          debug(err);
        });
    });
  }
  return { myTopHeadlines };
}

module.exports = newsService();
