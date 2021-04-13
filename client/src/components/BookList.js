import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS_QUERY } from "../queries/queries";
import BookDetails from "./BookDetails";

const BookList = () => {
  const [selected, setSelected] = useState(null);
  g(selected);

  const { loading, error, data } = useQuery(GET_BOOKS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul id="book-list">
        {data.books.map((book) => (
          <li
            style={{ cursor: "pointer" }}
            key={book.id}
            onClick={() => setSelected(book.id)}
          >
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails selected={selected} />
    </div>
  );
};

export default BookList;
