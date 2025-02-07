const {Router} = require("express")
const pg = require("pg");

const router = Router()

const pool = new pg.Pool({
    host: "localhost",     // Värden där databasen körs
    port: 5432,            // Standardport för PostgreSQL
    database: "library",   // Namn på din databas
    user: "jonatanvahlberg", // PostgreSQL-användare
    password: "password", // Ditt lösenord för databasen
});

// Testa anslutningen
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Fel vid anslutning till databasen:", err);
  } else {
    console.log("Ansluten till databasen:", res.rows);
  }
});

// GET anrop son hämtar våra authors
// kan också filtreras med ?q
router.get('/api/authors/', async (req, res) => {
  let query = 'SELECT * FROM Authors'
  let params = []
  if(req.query.q) {
    query = `${query} WHERE name ILIKE $1`
    params.push(`%${req.query.q}%`)
  }
  const result = await pool.query(query, params)
  const authors = result.rows
  res.json(authors)
})

//POST anrop som skapar en author så länge namn är ifyllt
router.post('/api/authors/', async (req, res) => {
  console.log(req.body)
  const name = req.body.name
  if(!name) {
    return res.status(400).json({
      message: "Name is required"
    })
  }
  // UNSAFE method of insert
  if(false) {
    const result = await pool.query(`INSERT INTO AUTHORS (name) VALUES ('${name}') RETURNING *`)
  }
  // SAFE method of insert
  const result = await pool.query(
    `INSERT INTO AUTHORS (name) VALUES ($1) RETURNING *`,
    [name]
  )
  const newAuthor = result.rows?.[0]
  res.status(201).json(newAuthor)
})

router.get('/api/books/', async (req,res) => {
  const result = await pool.query(
    'SELECT books.id, title, stock, Authors.id as author_id, Authors.name as author_name FROM BOOKS INNER JOIN Authors ON books.author_id = Authors.id'
  )
  const books = result.rows.map(book => {
    return {
      id: book.id,
      title: book.title,
      stock: book.stock,
      author: {
        id: book.author_id,
        name: book.author_name
      }
    }
  })
  return res.json(books)
})

//POST anrop som skapar en book
router.post('/api/books/', async (req,res) => {
  const {title, stock, author_id} = req.body
  if(!title || !stock || !author_id){
    return res.status(400).json({
      message: "ERROR: title, stock and author_id is required"
    })
  }
  const result = await pool.query(
    'INSERT INTO BOOKS (title, author_id, stock) VALUES($1,$2,$3) RETURNING *',
    [title, author_id, stock]
  )
  const book = result.rows?.[0]
  //TODO: handle dabase errors
  return res.status(201).json(book)
})

module.exports = router