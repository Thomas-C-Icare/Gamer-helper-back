const User = require('./user');
const Build = require('./build');
const Widget = require('./widget');
const Otp = require('./otp');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize( process.env.DATABASE_URL );
const RefreshToken = require('./refreshToken')(sequelize, Sequelize)
// Importation of the models

// Association one to one
Otp.belongsTo(User,{
    as: 'user',
    foreignKey: 'user_id'
});

Build.belongsTo(User, {
    as: 'user',
    foreignKey: 'user_id'
});

RefreshToken.belongsTo(User,{
    foreignKey: 'userId',
    targetKey: 'id'
});
User.hasOne(RefreshToken, {
    foreignKey: 'userId',
    targetKey: 'id'
});
// Build has a relationship with the User model, where the Build model has
// a user_id column which refers to the user ID in the User model.
// Association one to one between two models classes

// Association many to many
Build.belongsToMany(Widget, {
    as: 'widgets',
    through: 'build_has_widget',
    foreignKey: 'build_id',
    otherKey: 'widget_id',
    updatedAt: false
});
// the "as" option is used to name the relationship, while the "through" option is used to specify 
// the name of the join table that will be used associations between models.
// "foreignKey" and "otherKey" are used to specify foreign key columns in the JOIN table that refer to 
// "Build" and "Widget" model IDs, respectively.
// Association many to many beetwen two models classes

Widget.belongsToMany(Build, {
    as: 'builds',
    through: 'build_has_widget',
    foreignKey: 'widget_id',
    otherKey: 'build_id',
    updatedAt: false
});

// Same explanation but reversing Widget and Build
// Association many to many beetwen two models classes

module.exports = {
    Build,
    Widget,
    User,
    Otp,
    RefreshToken
};
// Export all models
