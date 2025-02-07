const { Author, Book } = require("./models")
const { Op } = require('sequelize');
const {Router} = require("express")

const router = Router()

router.get("/authors/", async (req,res) => {
  const q = req.query.q
  const options = {}
  if(q) {
    options.where = {
      name: {
        [Op.iLike]: `%${q}%`
      }
    }
  }
  const authors = await Author.findAll(options)

  return res.json(authors)
})

router.get("/books/", async (req,res) => {
  const q = req.query.q
  const withAuthor = req.query.withAuthor === 'true' 
  const options = {}
  if(q) {
    options.where = {
      title: {
        [Op.iLike]: `%${q}%`
      }
    }
  }
  if(withAuthor) {
    options.include = Author
  }
  const books = await Book.findAll(options)

  return res.json(books)
})

module.exports = router