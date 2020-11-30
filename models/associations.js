// what does this do; foreignKey?
User.hasMany(Category);
// what does this do; foreignKey?
Category.hasMany(Article);
// foreignKey used to link two tables together 
Category.belongsTo(User, { as: 'UserRef', foreignKey: 'userId' }); // puts foreignKey userId into Category table
Article.belongsTo(Category, { as: 'All_Categories', foreignKey: 'categoryId'} ); // puts foreignKey CategoryId into Article table


// when using User model to query categories must include model alias name
Category.findById('1', {
  include: [{
    model: User, as: 'UserRef'
  }]
});

const userCategories = await Category.findAll({
  include: [{
    required: true,
    model: User, as: 'UserRef',
    where: {
      // filter user based on userId foreignKey = user.id of 'current user'
      'userId?? or UserId': user.id
    }
  }]
});

const user = 'selected User model'
const userArticles = await Article.findAll({
  include: [{
    required: true,
    model: Category, as: 'All_Categories',
    where: {
      // filter category based on userId foreignKey = user.id of 'current user'
      userId: user.id
    }
  }]
});