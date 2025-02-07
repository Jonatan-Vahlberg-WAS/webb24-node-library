const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("library", "jonatanvahlberg", "password", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Ansluten till databasen med Sequelize.");
  })
  .catch((err) => {
    console.error("Kunde inte ansluta till databasen:", err);
  });

  sequelize
  .sync({ alter: true }) // Skapar eller uppdaterar tabeller baserat på modeller
  .then(() => {
    console.log("Tabeller synkroniserade med Sequelize.");
  })
  .catch((err) => {
    console.error("Kunde inte synkronisera tabeller:", err);
  });

module.exports = sequelize;