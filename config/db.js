const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./db.sqlite", (error) => {
    if (error) {
        console.log(error.message)
        throw error
    }
})

const usersStmt = `
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booktitle TEXT,
    author TEXT
)
`

db.run(usersStmt, (error) => {
    if(error) {
        console.log(error.message)
    } else {
        const insert = "INSERT INTO books (booktitle, author) VALUES (?,?)"
        db.run(insert, ["sagan om tornen", "harry potter"])
    }
})

module.exports = db;