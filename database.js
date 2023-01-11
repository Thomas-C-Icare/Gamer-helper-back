const { Sequelize } = require("sequelize");

// Sequelize makes it easier to access relational databases using JavaScript objects

const sequelize = new Sequelize(process.env.DATABASE_URL, {
// To connect to the database, you must create a Sequelize instance to connect to a database
// Process.env means property returns an object containing the user environment
// DATABASE_URL is a variable contains the database to connect in the .env file
dialectOptions: {
  ssl: {
    rejectUnauthorized: false,
  } 
},
  define: {
  // Default option
    underscored: true, 
    // Convert camelCase in snake_cake in the database
    // Sequelize provides the underscored option for a model
    // When true, this option will set the field option on all attributes to the snake_case
    // exemple : created_at, updated_at replace createdAt, updatedAt
  },
});

module.exports = { sequelize };
