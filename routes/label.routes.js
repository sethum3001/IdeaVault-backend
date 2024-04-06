const express = require('express');
const router = express.Router();
const Label = require('../models/LabelModel');
const { verifyAccessToken } = require('../middleware/jwt_authentication');

// Create a new label
router.post('/', verifyAccessToken, async (req, res) => {
    const label = new Label({
        labelName: req.body.labelName,
        userId: req.payload.userId,
    });
    try {
        await label.save();
        res.status(201).send(label);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get all labels
router.get('/', verifyAccessToken, async (req, res) => {
    try {
        const labels = await Label.find({userId: req.payload.userId});
        res.send(labels);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a label by id
router.get('/:id', verifyAccessToken, async (req, res) => {
    try {
        const label = await Label.findById(req.params.id);
        if (!label) {
            return res.status(404).send();
        }
        res.send(label);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update a label by id
router.patch('/:id', verifyAccessToken, async (req, res) => {
    try {
        const label = await Label.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!label) {
            return res.status(404).send();
        }
        res.send(label);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a label by id
router.delete('/:id', verifyAccessToken, async (req, res) => {
    try {
        const label = await Label.findByIdAndDelete(req.params.id);
        if (!label) {
            return res.status(404).send();
        }
        res.send(label);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;