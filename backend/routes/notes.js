const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

//ROUTE 1: get all the notes using GET . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.send(500).send("Internal Server Error");
  }
});

//ROUTE 2: add a note in user notes using POST . Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title must be atleast 3 character").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //validate error in input title and description
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.send(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3: update a user note by PUT . Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // a new empty note is created and if new data is there then we upadte otherwise empty
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find a note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    //authenticate that changin user change only his note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //updating a note
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.send(500).send("Internal Server Error");
  }
});

//ROUTE 4: delete a user note by DELETE . Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find a note to be deldeted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    //authenticate that deleting user delete only his note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    //deleting a note
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted" });
  } catch (error) {
    console.log(error.message);
    res.send(500).send("Internal Server Error");
  }
});
module.exports = router;
