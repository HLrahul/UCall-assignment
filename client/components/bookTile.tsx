"use client";

import React from "react";
import EditButton from "./editButton";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Book, useBookStore } from "@/store/useBookStore";
import axios from "axios";
import { useToast } from "./ui/use-toast";

export default function BookTile(book : Book) {
    const { toast } = useToast();
  const deleteBook = useBookStore((state) => state.deleteBook);

  const handleDelete = async (bookId: number) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}books/${bookId}`);
      if (response.status === 200) {
        deleteBook(bookId);

        toast({
          title: "Delete Successful",
          description: "The book has been deleted successfully."
        });
      } else {
        console.error("Failed to delete the book from the API.");
      }
    } catch (error) {
      console.error("Error deleting the book:", error);
    }
  };

  return (
    <Card className="w-fit h-fit cursor-pointer">
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>by {book.author}</CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between gap-4">
        <EditButton {...book} />
        <Button size="sm" variant="ghost" onClick={() => handleDelete(book.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
