module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_nm: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_nm: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_nm: DataTypes.STRING,
    country_cd: {
      type: DataTypes.STRING,
      defaultValue: 'us',
      validate: {
        isIn: {
          args: [['ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb', 'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl', 'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']],
          msg: 'Error: Field must be valid country code (us, it, jp).'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.full_nm = `${user.first_nm} ${user.last_nm}`;
      }
    }
  });
  return User;
};

// example catch on User.country_cd validation error
// app.get('/', (req, res) => {
//   User.create([
//   first_nm: 'John',
//   last_nm: 'Doe',
//   country_cd: 'zz'
//   ])
//   .then((user) => { res.json(user) });
//   .catch((err) => { console.log(err); res.status(404).send(err) });
// });
