module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      text: DataTypes.STRING,
      complete: DataTypes.BOOLEAN
    });
    return User;
  };
  