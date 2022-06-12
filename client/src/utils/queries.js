import { gql } from '@apollo/client'

export const GET_ME = gql`
query Me {
  me {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      image
      link
      title
    }
  }
}
`

export const SAVE_BOOK =  gql ` 
mutation SaveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
    _id
    username
    bookCount
  }
}
`

export const REMOVE_BOOK = gql `
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    _id
  }
}
`