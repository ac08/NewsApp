// // foreignKey = CategoryId and UserId in UserCategories table
User.belongsToMany(Category, { as 'Selected_Categories', through 'UserCategories' });

User.findById('req.params.id', {
  include: Category, as: 'Selected_Categories', 
  attribute: ['category'],
})

Category.belongsToMany(User, { as 'All_Users', through 'UserCategories' });

Category.findById('req.params.id', {
  include: User, as: 'All_Users', 
  attribute: ['full_nm']
})

User.create({
  first_nm: req.body.first_nm,
  last_nm: req.body.last_nm,
  country_cd: req.body.country_cd
})
.then((user) => {
  user.setSelected_Categories([user.id]);
})
// use Getters and Setters to add Users to categories after the categories are defined
// app.put('/addUser', (req, res) => {
//   Category.findById({ where: { category: req.body.category } })
//     .then((category) => {
//       category.addAll_Users({ where: { full_nm: req.body.full_nm }})
//   }).then(() => {
//       res.send('User added');
//   })
// });

app.put('/addCategory', (req, res) => {
  User.findAll({ where: { full_nm: req.body.full_nm } })
    .then((User) => {
      User.addSelectedCategories(['5', '6'])
  }).then(() => {
      res.send('Categories added to selected user');
  }).catch((err) => {
      console.log(err);
      res.status(404).send(err);
  });
});


//  all users with just their name as well as any associated categories 
app.get('/getUserCategories', (req, res) => {
  User.findAll({
    attributes: ['full_nm'],
    include: [{
      model: Category, as: 'Selected_Categories', 
      attributes: ['category']
    }]
  })
  .then((output) => {
    res.json(output)
  })
  .catch((err) => {
    console.log(err);
    res.status(404).send(err);
  });
});