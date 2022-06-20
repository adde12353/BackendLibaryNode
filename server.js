const express = require("express")
const booksRouter = require('./routers/routes')

const app = express()

app.use(express.json())

app.use("/books", booksRouter)

app.listen(4000, () => {
    console.log("servenr körs")
})