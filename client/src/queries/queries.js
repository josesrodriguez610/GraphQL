import { gql } from "@apollo/client";

// All books
export const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      id
    }
  }
`;

// All authors
export const GET_AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`;

// Add a Book
export const ADD_BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;
