const { Author } = require("./models")
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

module.exports = router