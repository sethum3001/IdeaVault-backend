const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    labelName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;