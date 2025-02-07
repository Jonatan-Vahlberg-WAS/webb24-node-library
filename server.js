const express = require("express")
const pg = require("pg");

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

// Vår Webbserver
const app = express();

//GET Anrop till /
app.get('/',(req, res) => {
    res.send("Hello World")
})

//GET Anrop som skickar tillbaka JSON
app.get('/api/hello-world/', (req, res) => {
    res.json({
       message: "hello World!" 
    })
})

// GET anrop son hämtar våra authors
// kan också filtreras med ?q
app.get('/api/authors/', async (req, res) => {
  let query = 'SELECT * FROM Authors'
  if(req.query.q) {
    query = `${query} WHERE name ILIKE '%${req.query.q}%'`
  }
  const result = await pool.query(query)
  const authors = result.rows
  res.json(authors)
})


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Listing on port: ", port)
})