const express = require("express");
const router = express.Router();
const Note = require("../models/NoteModel");
const { verifyAccessToken } = require("../middleware/jwt_authentication");

// Create a new note
router.post("/", verifyAccessToken, async (req, res) => {
  const note = new Note({
    title: req.body.title,
    body: req.body.body,
    user: req.payload.userId,
    label: req.body.label,
    isPin: req.body.isPin,
  });
  try {
    await note.save();
    res.status(201).send(note);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all notes
router.get("/", verifyAccessToken, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.payload.userId });
    res.send(notes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a note by id
router.get(":id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a note by id
router.patch("/:id",verifyAccessToken, async (req, res) => {
  const { title, body, label, isPin } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, {
      title,
      body,
      label,
      isPin,
    });
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a note by id
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).send();
    }
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
