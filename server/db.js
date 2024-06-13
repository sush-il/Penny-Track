// const pg = require('pg');
// const { Pool } = pg;

// const pool = new Pool({
//   host: 'localhost',
//   user: 'database-user',
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// module.exports = pool;


const { Sequelize } = require('sequelize');
const config = require('./models/config');

const sequelize = new Sequelize(config['development']);

const User = require('./models/userModel')(sequelize);
const Favourites = require('./models/favTickerModel')(sequelize);

// Define associations
User.hasMany(Favourites, { foreignKey: 'userId', as: 'favourites' });
Favourites.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const syncModels = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};

module.exports = {
  sequelize,
  User,
  Favourites,
  syncModels,
};

