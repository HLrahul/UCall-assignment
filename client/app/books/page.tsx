"use client";

import { useEffect } from "react";
import BookTile from "@/components/bookTile";
import { useBookStore } from "@/store/useBookStore"; // Adjust the import path as necessary

export default function Books() {
  const { books, fetchBooks, deleteBook } = useBookStore(); // Destructure the needed actions and state

  useEffect(() => {
    fetchBooks(); // Fetch books on component mount
  }, [fetchBooks]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center w-full">
      <div className="flex flex-wrap gap-6 justify-center items-start max-w-max">
        {books.map((book) => (
          <BookTile {...book} key={book.id} />
        ))}
      </div>
    </div>
  );
}
