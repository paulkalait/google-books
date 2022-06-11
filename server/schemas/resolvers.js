const { User} = require('../models')
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
    },
    Mutation:{
        addUser: async (paret, args) => {
             //Here, the Mongoose User model creates a new user in the database with whatever is passed in as the args
             const user = await User.create(args)
             const token = signToken(user)
             return { user, token}
        },
        login: async(parent, { email, password}) => {
            const user = await User.findOne({email})

            if(!user){
                throw new AuthenticationError('Incorrect credentials')
            }
            const correctPw = await user.isCorrectPassword(password)
            if(!correctPw){
                throw new AuthenticationError('Incorrect Credentials')
            }
            const token = signToken(user)

            return { user, token}
        },
        saveBook: async (parent, { bookData }, context) => {
            if(context.user){
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id},
                    {$push: { savedBooks: bookData}},
                    { new: true}
                )
                return updateUser
            }
        },

        removeBook: async (parent, { bookId}, context ) => {
            if(context.user){
                const  updateUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: { savedBooks: { bookId}}},
                    {new: true}
                )
                return updateUser
            }
            throw new AuthenticationError(" You must be logged in to remove book")
    
        }
    }
}

module.exports = resolvers