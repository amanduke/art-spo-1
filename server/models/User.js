const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const artSchema = require('./Art');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        savedArt: [artSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// set up pre-save middleware to hash a password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// compare the incoming password with the new hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// when we query a user we'll also get another field called 'artCount' with th number art items we have saved
userSchema.virtual('artCount').get(function () {
    return this.savedArt.length;
});

const User = model('User', userSchema);

module.exports = User;
