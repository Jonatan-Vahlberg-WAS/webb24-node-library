const { Author } = require("./models")
const {Router} = require("express")

const router = Router()

router.get("/authors/", async (req,res) => {
  const authors = await Author.findAll()

  return res.json(authors)
})

module.exports = router