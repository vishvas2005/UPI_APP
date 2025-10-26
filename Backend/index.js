const http = require('http')
const express = require('express')
const cors = require('cors')
const mainRouter = require("./routes/indexroute")
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api" , mainRouter)


app.listen(3000);