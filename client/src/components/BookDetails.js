import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BOOK_QUERY } from "../queries/queries";

const BookDetails = ({ selected }) => {
  const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
    variables: { id: selected },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  const { book } = data;

  return (
    <div id="book-details">
      <h2>{book?.name}</h2>
      <p>{book?.genre}</p>
      <p>{book?.author.name}</p>
      <p>All books by this author</p>
      <ul className="other-books">
        {book?.author?.books?.map((item) => {
          return <li key={item?.id}>{item?.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default BookDetails;
