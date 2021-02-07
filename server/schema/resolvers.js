const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            return User.find()
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveArtist: async (parent, { artistData }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedArtist: artistData } },
                    { new: true, runValidators: true }
                )

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        },

        removeArtist: async (parent, { artistId }, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedArtist: { artistId } } },
                    { new: true, runValidators: true }
                )

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
}

module.exports = resolvers