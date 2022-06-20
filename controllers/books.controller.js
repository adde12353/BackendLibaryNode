const books = require('../models/books.modle')



async function getAll (req,res) {
    const results = await books.getAll()
    res.status(200).json({books: results}) 
}

async function getOne (req,res) {
    const {id} = req.params
    const results = await books.getOne(id)
    res.status(200).json({books: results}) 
}

async function post (req,res) {
    const { booktitle, author } = req.body
    const titleExist = await books.getTitle(booktitle)
    
    if(!booktitle || !author){
        return res.status(400).send({message: "Ni måste fylla i båda fälten"})
    }

    if(titleExist.length !== 0){
       return res.status(400).send({message: "Bokens titel finns redan testa igen"})
    }
        const newBook = {booktitle, author}
        await books.postOne(newBook) 
        res.status(200).send({message: `Boken med titeln: ${booktitle} från författaren: ${author} är nu tillagd i systemet`})
}


async function deleteOne (req,res) {
    const {id} = req.params
    const idExist = await books.getOne(id)

    if (idExist.length === 0) {
    return res.status(404).send({message: "id:t du försöker ta bort finns inte"})
    }
    await books.deleteOne(id)
    res.status(200).send({message: `Boken med titeln: ${idExist[0].booktitle} från författaren: ${idExist[0].author} är nu borttagen`}) 
}

async function deleteAll (req,res) {
    await books.deleteAll()
    res.status(200).send({message: `Alla böcker har blivit borttagna`}) 
}




async function put (req, res) {
    const {id} = req.params
    const { booktitle, author } = req.body
    
    if(!booktitle && !author){
        return res.status(400).send({message: "Ni måste fylla i båda fälten"})
    }

    const idExist = await books.getOne(id)

    if (idExist.length === 0) {
        return res.status(404).send({message: "id:t du försökt uppdatera finns inte"})
    }

    await books.put(booktitle, author, id)
    res.status(200).send({message: "boken har uppdaterats"})
}


async function patch (req, res) {
    const {id} = req.params
    const { booktitle, author } = req.body
    
    
    const idExist = await books.getOne(id)
    if (idExist.length === 0) {
        return res.status(404).send({message: "id:t du försökt uppdatera finns inte"})
    }

    if(!booktitle && !author || booktitle && author) {
        return res.status(400).send({message: "Skriv bara in ett fält vid patch, eller iaf någon"})
    }
    else if(booktitle && !author || !booktitle && author){
        await books.patch(booktitle, author, id)
    res.status(200).send({message: "boken har uppdaterats"})
    }
}

module.exports = {
    getAll,
    post,
    getOne,
    deleteOne,
    deleteAll,
    put,
    patch
}
