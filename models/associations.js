// for every Category created, a foreignKey of userId will be placed into Categories table
// when a user is created/queried we receive back an array of Categories ('All_Categories')
User.hasMany(Category, { as: 'All_Categories', foreignKey: 'userId' });

// single user route to retrieve all associated categorties 
User.findById('User.id', {
  include: [{
    model: Category, as: 'All_Categories', 
    attributes: ['category']
  }]
});

// request several users
User.findAll({ where: { full_nm: 'req.params.full-name' }, 
  include: [{ 
    model: Category, as: 'All_Categories', 
    attributes: ['category'] 
  }] 
});


// for every Article created, a foreignKey of categoryId will be placed into Articles table
// when a category is created/queried we receive back an array of Articles ('All_Articles')
Category.hasMany(Article, { as: 'All_Articles', foreignKey: 'categoryId' });

// single category route to retrieve all associated articles
Category.findById('Category.Id', {
  include: [{
    model: Article, as: 'All_Articles'
  }]
});


// foreignKey used to link two tables together 
// puts foreignKey userId into Categories table
Category.belongsTo(User, { as: 'UserRef', foreignKey: 'userId' });

// when using Category model to query categories must include model alias name
Category.findById('Category.Id', {
  include: [{
    model: User, as: 'UserRef', 
    attributes: ['full_nm']
  }]
});

// request several categories 
Category.findAll({ where: { category: 'req.params.category'}, 
  include: [{ 
    model: User, as: 'UserRef', 
    attributes: ['full_nm'] 
  }] 
}); 

const userCategories = await Category.findAll({
  include: [{
    required: true,
    model: User, as: 'UserRef',
    where: {
      // filter user based on userId foreignKey = user.id of 'current user'
      userId: userRef.id
    }
  }]
});


// puts foreignKey categoryId into Articles table
Article.belongsTo(Category, { as: 'All_Categories', foreignKey: 'categoryId'});

// const user = 'selected User model'
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