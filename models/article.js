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
    publishedAt: DataTypes.DATE,
  }, {
    timestamps: false
  });
  Article.associate = (models) => {
    Article.belongsTo(models.Category, {
      as: 'All_Categories',
      foreignKey: 'categoryId'
    });
    Article.belongsTo(models.User, {
      as: 'User_Ref',
      foreignKey: 'userId'
    });
  };
  return Article;
};
