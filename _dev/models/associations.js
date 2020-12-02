// // for every Category created, a foreignKey of userId will be placed into Categories table
// // when a user is created/queried we receive back an array of Categories ('All_Categories')
User.hasMany(Category, { as: 'All_Categories', foreignKey: 'userId' });

// // for every Article created, a foreignKey of categoryId will be placed into Articles table
// // when a category is created/queried we receive back an array of Articles ('All_Articles')
Category.hasMany(Article, { as: 'All_Articles', foreignKey: 'categoryId' });

// // foreignKey used to link two tables together 
// // puts foreignKey userId into Categories table
Category.belongsTo(User, { as: 'UserRef', foreignKey: 'userId' });

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

// // puts foreignKey categoryId into Articles table
Article.belongsTo(Category, { as: 'All_Categories', foreignKey: 'categoryId'});

const user = 'selected User model via getAllUsers route?'
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


// does not work because you cannot assoicate same category to different users
// possibly create the user (await); then create categories based on user selection
// and addAll_Users using add method
// router.post('/createCategory', (req, res) => {
//   db.Category.create({
//     category: req.body.category,
//     userId: req.body.userId
//   })
//     .then((dbCategory) => {
//       res.json(dbCategory);
//     });
// });