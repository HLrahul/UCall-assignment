"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useBookStore } from "@/store/useBookStore";
import axios from "axios";
import { useState } from "react";

export default function AddBook () {
    const { toast } = useToast();
    const { addBook } = useBookStore((state) => state);

    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [year, setYear] = useState<number>();

    const handleCreate = async (e: any) => {
        e.preventDefault();

        const book = {
            title,
            author,
            year
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}books/`, book);
            const createdBook = response.data;
            addBook(createdBook);

            toast({
                title: "Book created",
                description: "The book has been created successfully."
            });

            setTitle("");
            setAuthor("");
            setYear(0);
        } catch (err) {
            console.error("Error creating the book:", err);
        }
    }

    return (
      <div className="h-[90vh] w-full flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>New Book</CardTitle>
            <CardDescription>
              Enter the details of the book you want to add
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full flex flex-col gap-3">
            <Input placeholder="Book Title" value={title} onChange={e => {setTitle(e.target.value)}} />
            <Input placeholder="Book author" value={author} onChange={e => {setAuthor(e.target.value)}} />
            <Input placeholder="Year" value={year} onChange={e => {setYear(parseInt(e.target.value));}} />
          </CardContent>

          <CardFooter>
            <Button className="w-full" onClick={e => { handleCreate(e) }}>Create</Button>
          </CardFooter>
        </Card>
      </div>
    );
}