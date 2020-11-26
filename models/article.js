module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    source_nm: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    urlToImage: DataTypes.STRING,
    publishedAt: DataTypes.STRING,
    content: DataTypes.STRING
  });
  return Article;
};

// category should be FK on this table
