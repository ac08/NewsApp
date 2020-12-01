// // foreignKey = CategoryId and UserId in UserCategories table
User.belongsToMany(Category, { as 'User_Categories', through 'UserCategories' });

User.findById('req.params.id', {
  include: Category, as: 'User_Categories', 
  attribute: ['category'],
})

Category.belongsToMany(User, { as 'All_Users', through 'UserCategories' });

Category.findById('req.params.id', {
  include: User, as: 'All_Users', 
  attribute: ['full_nm']
})


// // use Getters and Setters to add Users to categories after the categories are defined?
// app.put('/addUser', (req, res) => {
//   Category.findById('id or a where clause or from req.body')
//     .then((category) => {
//       category.addAll_Users('id or a where clause or from req.body')
//   }).then(() => {
//       res.send('User added');
//   })
// });

// // all users with just their name as well as any associated categories 
// app.get('/getUserCategories', (req, res) => {
//   User.findAll({
//     attributes: ['full_nm'],
//     include: [{
//       model: Category, as: 'User_Categories', 
//       attributes: ['category']
//     }]
//   })
//   .then((output) => {
//     res.json(output)
//   })
//   .catch((error) => {
//     console.log(error);
//     res.status(404).send(error);
//   });
// });