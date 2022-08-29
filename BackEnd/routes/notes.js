const express = require('express');
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');

//ROUTE 1 : Get All the notes using GET : "/api/notes/fetchallnotes" . login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error Occured');
    }

})

//ROUTE 2 : Add a new note using POST : "/api/notes/addnote" . login required

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 7 }),

], async (req, res) => {
    let success = false;
    try {
        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const saveNote = await note.save()
        success = true;
        res.json({ success, saveNote })
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error Occured');
    }
})

//ROUTE 3 : Update a existing note using POST : "/api/notes/updatenote/:id" . login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //find a node to be updated and update it

        var note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error Occured');
    }

})

//ROUTE 4 : Delete a existing note using DELETE : "/api/notes/deletenote/:id" . login required

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find a node to be updated and delete it
        var note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //Allow delelte only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted" });
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error Occured');
    }

})

module.exports = router