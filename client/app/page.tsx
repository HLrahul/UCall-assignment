import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <Card className="max-w-[350px]">
        <CardHeader>
          <CardTitle>Welcome to U-Books</CardTitle>
          <CardDescription>
            This is a simple books management application built with FastAPI and React.js.
          </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="w-full mt-5">
          Start creating new books by navigating to the <Link className="underline" href="/add-book">Add book</Link> page from the menu options in the top right corner.
        </CardContent>

        <Separator />

        <CardFooter className="mt-5 flex items-center justify-center">
          <p className="text-sm text-gray-500">Crafted by <a className="underline" href="https://www.github.com/HLrahul">@Rahul</a></p>
        </CardFooter>
      </Card>
    </div>
  );
}
