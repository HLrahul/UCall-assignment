import { useState } from "react";
import { InputWithLabel } from "./inputWithLabel";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Book, useBookStore } from "@/store/useBookStore";
import axios from "axios";
import { useToast } from "./ui/use-toast";

export default function EditButton({
  id,
  title: initialTitle,
  author: initialAuthor,
  year: initialYear,
}: Book) {
  const { toast } = useToast();

  const [title, setTitle] = useState<string>(initialTitle);
  const [author, setAuthor] = useState<string>(initialAuthor);
  const [year, setYear] = useState<number>(initialYear);

  const updateBookInStore = useBookStore((state) => state.updateBook);

  const updateBook = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}books/${id}`,
        {
          title,
          author,
          year,
        }
      );

      const updatedBook = response.data;
      updateBookInStore(updatedBook);

      toast({
        title: "Edit successful",
        description: "The book has been updated successfully.",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Book will be updated with the given data
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4 mt-6 mb-6">
          <InputWithLabel label="Title" value={title} setValue={setTitle} />
          <InputWithLabel label="Author" value={author} setValue={setAuthor} />
          <InputWithLabel
            label="Year"
            value={String(year)}
            setValue={(value) => setYear(Number(value))}
          />
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={updateBook}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
