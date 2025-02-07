const express = require("express")

const nonOrmRouter = require("./nonOrmRouter")
const ormRouter = require("./ormRouter")

// Vår Webbserver
const app = express();

app.use(express.json()); // Tillåter oss att hantera inkommande JSON data

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

app.use("/", nonOrmRouter)
app.use('/api/orm/', ormRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Listing on port: ", port)
})