
const mongoose = require('mongoose')

const resolvers = {
    Query: {
        me: async () => { 
            return { 
                _id: mongoose.Types.ObjectId(),
                username: 'username',
                email: 'email'
            }
        },
        users: async () => {
            return [{
                _id: mongoose.Types.ObjectId(),
                username: 'Plumps',
                email: 'jack@gmail.com'
            }]
        }
    },

}

module.exports = resolvers