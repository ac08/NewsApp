module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country_cd: {
      type: DataTypes.STRING,
      defaultValue: 'en',
      validate: {
        len: [2]
      }
    }
  });
  return User;
};
