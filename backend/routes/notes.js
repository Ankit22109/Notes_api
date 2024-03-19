const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator')
// const User = require("../models/User")

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        // res.json({notes})
        res.send(notes)
    } catch (error) {
        res.status(500).send("Internal Server errors")
    }
})

router.post('/addnotes', fetchuser, [
    // body('title', 'Enter valid title').isLength({ min: 3 }),
    // body('description', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {
    const { title, description, tag } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const notes = new Notes({
            title, description, tag, user: req.user
        })

        const savednotes = await notes.save()
        res.send(savednotes)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }

})


router.put('/updatenotes/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body

    const newNotes = {}
    if (title) { newNotes.title = title }
    if (description) { newNotes.description = description }
    if (tag) { newNotes.tag = tag }
    try {
    let note = await Notes.findById(req.params.id)
    if (!note) { return res.status(400).send("Not found") }

    if (note.user.toString() !== req.user) {
        return res.status(401).send("Not Allowed")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
    res.json({ note })
    } catch(error){
        res.status(400).send(error.message)
    }

})

router.delete('/deletenotes/:id', fetchuser, async (req, res) => {
    // const {title, description, tag} = req.body
    try {
        let notes = await Notes.findById(req.params.id)
        if (!notes) { return res.status(400).send("Not found") }

        if (notes.user.toString() !== req.user) {
            return res.status(401).send("Not Allowed")
        }
        const user = {
            id: req.params.id
            // id:req.params.id
        }
        // findBy
        notes = await Notes.findByIdAndDelete(user.id)
        res.json({ notes, user })
    } catch(error){
        res.status(400).send(error.message)
    }
    // res.send(req.user)
})

module.exports = router