const { User } = require('../models')
const { AuthenticationError } = require('apollo-server-express')
const { signToken } = require('../utils/auth')


const resolvers = { 
    Query: {
        me: async (parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({_id: context.user._id})
                .select('-__v -password')
                return userData
            }
            throw new AuthenticationError('Not Logged IN')
        },
        users: async() => {
            return User.find()
            .select('-__v -password')
            .populate('savedBooks')
        },
       user: async (parent, {username}) => {
           return User.findOne({username})
           .select('-__v -password')
           .populate('savedBooks')
       },
    //    books: async (parent, { username }) => {
    //        const params = username ? {username} : {};
    //        return Book.find
    //    }
    }
}

module.exports = resolvers