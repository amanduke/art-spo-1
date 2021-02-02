const mongoose = require('mongoose');
const { Schema } = mongoose;

const artistSchema = new Schema({
    name: [{
        type: String,
    }],
    description: {
        type: String,
        required: true,
    },
    artistId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    }
});

module.exports = artistSchema;