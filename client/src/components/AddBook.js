import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_AUTHORS_QUERY,
  ADD_BOOK_MUTATION,
  GET_BOOKS_QUERY,
} from "../queries/queries";

const AddBook = () => {
  const [newBook, setNewBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  });

  const { loading, error, data } = useQuery(GET_AUTHORS_QUERY);
  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const submitForm = (e) => {
    e.preventDefault();

    const { name, genre, authorId } = newBook;

    addBook({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: GET_BOOKS_QUERY }],
    })
      .then((res) => console.warn(res))
      .catch((err) => console.error(err.message));

    return setNewBook({
      name: "",
      genre: "",
      authorId: "",
    });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
          required
        />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          required
        />
      </div>
      <div className="field">
        <label>Author:</label>
        <select
          onChange={(e) => setNewBook({ ...newBook, authorId: e.target.value })}
          required
        >
          <option>Select author</option>
          {data.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
