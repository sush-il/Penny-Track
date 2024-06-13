const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize(config.development);

// const Favourites = sequelize.define('Favourites', {
//   ticker: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Users', // 'Users' refers to table name
//       key: 'id', // 'id' refers to column name in Users table
//     },
//   },
// });

module.exports = (sequelize) => {
    const Favourites = sequelize.define('Favourites', {
        ticker: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users', // 'Users' refers to table name
            key: 'id', // 'id' refers to column name in Users table
          },
        },
      });

    return Favourites;
};
