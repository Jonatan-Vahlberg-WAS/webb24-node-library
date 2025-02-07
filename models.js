const { DataTypes } = require('sequelize') 
const sequelize = require("./sequelize")

const Author = sequelize.define('author',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
)

module.exports = {
    Author
}