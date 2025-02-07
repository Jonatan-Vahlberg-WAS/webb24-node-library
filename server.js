// Importerar Express.js ramverket som används för att skapa webbservern
const express = require("express");

// Importerar våra egna router-moduler för olika API endpoints
// nonOrmRouter hanterar API-anrop utan ORM (Object-Relational Mapping)
const nonOrmRouter = require("./nonOrmRouter");
// ormRouter hanterar API-anrop med ORM för databasinteraktioner
const ormRouter = require("./ormRouter");

// Skapar en ny Express-applikation
const app = express();

// Middleware som gör att servern kan ta emot JSON-data i HTTP-anrop
app.use(express.json());

// GET-endpoint för rotvägen '/'
// Returnerar ett enkelt "Hello World" meddelande
app.get("/", (req, res) => {
  res.send("Hello World");
});

// GET-endpoint som returnerar JSON-data
// Används för att testa API:et och JSON-respons
app.get("/api/hello-world/", (req, res) => {
  res.json({
    message: "hello World!",
  });
});

// Kopplar in våra router-moduler till specifika URL-prefix
// Alla routes i nonOrmRouter kommer att vara tillgängliga från rot-URL:en
app.use("/", nonOrmRouter);
// Alla routes i ormRouter kommer att vara tillgängliga under '/api/orm/'
app.use("/api/orm/", ormRouter);

// Sätter portnumret för servern
// Använder miljövariabeln PORT om den finns, annars port 3000
const port = process.env.PORT || 3000;

// Startar servern och lyssnar på den specificerade porten
app.listen(port, () => {
  console.log("Listing on port: ", port);
});
