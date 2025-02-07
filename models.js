const { DataTypes } = require('sequelize') 
const sequelize = require("./sequelize")

const Author = sequelize.define('author',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yearOfBirth: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        timestamps: false,
    }
)

module.exports = {
    Author
}