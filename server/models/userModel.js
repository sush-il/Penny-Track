const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');
const sequelize = new Sequelize(config['development']);
const bcrypt = require('bcrypt');

const User = sequelize.define(
  'User',
  {
    // firstName: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    // lastName: {
    //   type: DataTypes.STRING,
    //   allowNull:false,
    // },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
      // }
    },
  },
);

User.beforeCreate(async (user) => {
  try{
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch(error){
    console.error("User password couldn't be hashed: " + error);
  }
})

// createUser(mockUser);

module.exports = {
  sequelize,
  User
};
