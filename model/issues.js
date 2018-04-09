const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    },
    comment: String,
    comments: [String]
});

module.exports = mongoose.model("issue", issueSchema);
