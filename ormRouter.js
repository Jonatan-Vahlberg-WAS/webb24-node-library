// Importerar Sequelize-modeller för Author och Book från models-mappen
const { Author, Book } = require("./models");
// Importerar Sequelize-operatorer för avancerade databasfrågor
const { Op } = require("sequelize");
// Importerar Express och skapar en router
const express = require("express");
const router = express.Router();

// GET-endpoint för att hämta alla författare
// Stödjer sökning med query parameter ?q som filtrerar på författarnamn
// Exempel: /authors?q=Anders
router.get("/authors/", async (req, res) => {
  const q = req.query.q;
  const options = {};
  if (q) {
    options.where = {
      name: {
        [Op.iLike]: `%${q}%`, // Case-insensitive sökning med wildcards
      },
    };
  }
  const authors = await Author.findAll(options);

  return res.json(authors);
});

// GET-endpoint för att hämta alla böcker
// Stödjer:
// - sökning med ?q som filtrerar på boktitel
// - ?withAuthor=true för att inkludera författardata i svaret
// Exempel: /books?q=Harry&withAuthor=true
router.get("/books/", async (req, res) => {
  const q = req.query.q;
  const withAuthor = req.query.withAuthor === "true";
  const options = {};
  if (q) {
    options.where = {
      title: {
        [Op.iLike]: `%${q}%`, // Case-insensitive sökning med wildcards
      },
    };
  }
  // Inkluderar författardata om withAuthor=true
  if (withAuthor) {
    options.include = Author;
  }
  const books = await Book.findAll(options);

  return res.json(books);
});

module.exports = router;
