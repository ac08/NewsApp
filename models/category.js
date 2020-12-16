module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: false
  });
  Category.associate = (models) => {
    Category.hasMany(models.Article, {
      as: 'All_Articles',
      foreignKey: 'categoryId'
    });
    Category.belongsTo(models.User, {
      as: 'UserRef',
      foreignKey: 'userId'
    });
    Category.belongsToMany(models.User, {
      as: 'All_Users',
      through: 'UserCategories',
      foreignKey: 'categoryId'
    });
  };
  return Category;
};
