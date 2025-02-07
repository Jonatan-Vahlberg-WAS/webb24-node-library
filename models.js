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

const Book = sequelize.define('book', 
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
              model: Author,
              key: "id",
            },
            allowNull: false
        }, 
    },
    {
        timestamps: false
    }
)

Author.hasMany(Book, { foreignKey: "author_id" })
Book.belongsTo(Author, { foreignKey: "author_id" })

module.exports = {
    Author,
    Book
}