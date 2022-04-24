// import people model
// const res = require('express/lib/response')
const Author = require('../models/author')
const peopleData = require('../models/peopleModel')

// handle request to get all data instances
const getAllPeopleData = async (req, res, next) => {
    try {
        const authors = await Author.find().lean()
        return res.render('allData', {data: authors})
    } catch (err) {
        return next(err)
    }
}

// handle request to get one data instance
const getDataById = async (req, res, next) => {
    // search the database by ID
    try {
        const author = await Author.findById(req.params.author_id).lean()
        if (!author) {
            // no author found in database
            return res.sendStatus(404)
        }
        // found the author
        return res.render('oneData', {oneItem: author})
    } catch (err) {
        return next(err)
    }

}

// CHALLENGE EXERCISE: change this to use MongoDB!
// const insertData = (req, res) => {
//     const { id, first_name, last_name } = req.body
//     peopleData.push({ id, first_name, last_name })
//     return res.redirect('back')
// }

// CHALLENGE solution
// note: This function is omitted from my solution on Heroku
const insertData = async (req, res, next) => {
    try {
        newAuthor = new Author( req.body )
        await newAuthor.save()
        return res.redirect('/people')
    } catch (err) {
        return next(err)
    }
}

// exports an object, which contain functions imported by router
module.exports = {
    getAllPeopleData,
    getDataById,
    insertData,
}
