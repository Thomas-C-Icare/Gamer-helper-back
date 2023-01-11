const { Sequelize, DataTypes, Model } = require("sequelize");
// The Datatypes class contains a list of built-in data types that can be used when defining the columns
//  of a database table. Different databases have different data types
// https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
// The model class represents a table in a database, and it provides methods for querying and 
// manipulating data in that table.
// https://sequelize.org/master/manual/model-basics.html
const { sequelize } = require("../database");

class Widget extends Model {}
// https://sequelize.org/docs/v6/core-concepts/model-basics/#model-definition

Widget.init(
// Define the model of "Widget" with the fields "name", "position_x", and "position_y"
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        position_x: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        position_y: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        // The type of this field specifies the type of data can contain
        // Principally we have INTEGER, STRING, DATE and BOOLEAN
        // https://sequelize.org/docs/v7/other-topics/other-data-types/
        
        // If you set allowNull to false, this field will be required and cannot be empty.
        // If you set allowNull to true, this field will be optional and can be empty.
        // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
    },{
        sequelize: sequelize,
        // Second argument and second object of init: the link with the database
        tableName: 'widget' 
        // Table name concerned
    }
)

module.exports = Widget;
// Export Widget Model
