// attribute - value pair for Article model
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    source_nm: DataTypes.STRING,
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: DataTypes.TEXT,
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    urlToImage: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    publishedAt: DataTypes.DATE, // DOES THIS NEED TO BE DATETIME/DATE TYPE?
    content: DataTypes.TEXT
  });
  return Article;
};

// category should be FK on this table
