const mongoose = require('mongoose');
const { Schema } = mongoose;

const artSchema = new Schema({
    authors: [{
        type: String,
    }],
    description: {
        type: String,
        required: true,
    },
    artId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
});

module.exports = artSchema;