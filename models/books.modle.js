const db = require("../config/db")

function getAll () {
    const sql = "SELECT id, booktitle, author from books"
    return new Promise ((resolve, reject) => {
        db.all(sql, (error, rows) => {
            if (error) {
                console.log(error)
                reject (error)
            }
            resolve (rows)
        })
    }) 
}

function getOne (id) {
    const sql = "SELECT id, booktitle, author from books WHERE id = ?"
    return new Promise ((resolve, reject) => {
        db.all(sql, [id], (error, rows) => {
            if (error) {
                console.log(error)
                reject (error)
            }
            resolve (rows)
        })
    }) 
}

function getTitle (id) {
    const sql = "SELECT id, booktitle, author from books WHERE booktitle = ?"
    return new Promise ((resolve, reject) => {
        db.all(sql, [id], (error, rows) => {
            if (error) {
                console.log(error)
                reject (error)
            }
            resolve (rows)
        })
    }) 
}

function postOne (newBook) {
 const sql = "INSERT INTO books (booktitle, author) VALUES (?, ?)"
    return new Promise ((resolve, reject) => {
        db.run(sql, [newBook.booktitle, newBook.author], (error) => {
            if(error) {
                console.log(error)
                reject(error)
            }
            resolve()
        })
    })
}

function deleteOne (id) {
    const sql = "DELETE from books WHERE id = ?"
    return new Promise ((resolve, reject) => {
        db.all(sql, [id], (error) => {
            if (error) {
                console.log(error)
                reject (error)
            }
            resolve ()
        })
    }) 
}

function deleteAll () {
    const sql = "DELETE from books"
    return new Promise ((resolve, reject) => {
        db.all(sql, (error) => {
            if (error) {
                console.log(error)
                reject (error)
            }
            resolve ()
        })
    }) 
}

function put (booktitle, author, id) {
    console.log(booktitle)
    const sql = "UPDATE books SET booktitle = ?, author = ? WHERE id=?"
    return new Promise ((resolve, reject) => {
        db.all(sql, [booktitle, author, id], (error) => {
            console.log(sql)
            if (error) {
                console.log(error)
                reject (error)
            }
            resolve ()
        })
    }) 
}

function patch (booktitle, author, id) {

    if(booktitle && !author){
        const sql = "UPDATE books SET booktitle = ? WHERE id=?"
        return new Promise ((resolve, reject) => {
            db.all(sql, [booktitle, id], (error) => {
                console.log(sql)
                if (error) {
                    console.log(error)
                    reject (error)
                }
                resolve ()
            })
        }) 
    } else if(author && !booktitle ){
        const sql = "UPDATE books SET author = ? WHERE id=?"
        return new Promise ((resolve, reject) => {
            db.all(sql, [author, id], (error) => {
                console.log(sql)
                if (error) {
                    console.log(error)
                    reject (error)
                }
                resolve ()
            })
        }) 
    } 
    
}

module.exports = {
    getAll,
    postOne,
    getOne,
    getTitle,
    deleteOne,
    deleteAll,
    put,
    patch
}



//Skriv alltid in funtionen i modules