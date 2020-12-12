module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // first_nm: {
    //   type: DataTypes.STRING(225),
    //   allowNull: false
    // },
    // last_nm: {
    //   type: DataTypes.STRING(225),
    //   allowNull: false
    // },
    // full_nm: DataTypes.STRING(225),
    username: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(225),
      allowNull: false
    },
    country_cd: {
      type: DataTypes.STRING(2),
      defaultValue: 'us',
      validate: {
        isIn: {
          args: [['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']],
          msg: 'Error: Field must be valid country code (us, it, jp).'
        }
      }
    }
  }, {
    timestamps: false,
    // hooks: {
    //   beforeCreate: (user) => {
    //     user.full_nm = `${user.first_nm} ${user.last_nm}`;
    //   }
    // }
  });
  User.associate = (models) => {
    User.hasMany(models.Category, {
      as: 'All_Categories',
      foreignKey: 'userId'
    });
    User.hasMany(models.Article, {
      as: 'All_Articles',
      foreignKey: 'userId'
    });
    User.belongsToMany(models.Category, {
      as: 'Selected_Categories',
      through: 'UserCategories',
      foreignKey: 'userId'
    });
  };
  return User;
};

// example catch on User.country_cd validation error
// app.get('/createUser', (req, res) => {
//   User.create([
//   first_nm: 'John',
//   last_nm: 'Doe',
//   country_cd: 'zz'
//   ])
//   .then((user) => { res.json(user) });
//   .catch((err) => { console.log(err); res.status(404).send(err) });
// });
