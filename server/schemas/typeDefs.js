const { gql } = require('apollo-server-express')

//create our typeDefs
const typeDefs = gql`

type Book{
    bookId: String
    authors: String
    description: String
    image: String
    link: String
    title: String
}

type User { 
    _id: ID
    username: String
    email: String
    bookCount: Int
    #check this if its book or bookSchema
    savedBooks: [Book]
}

input BookInput { 
    description: String!
    title: String!
    bookId: String!
    image: String
    link: String
    authors: [String]
}

type Query{
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(_id: ID!) : Book
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeBook(bookId: ID!): User
    saveBook(bookData: BookInput!): User
}

type Auth{
    token: ID!
    user: User
}

`

module.exports = typeDefs