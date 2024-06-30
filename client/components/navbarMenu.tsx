import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { DropdownMenuGroup } from "./ui/dropdown-menu";
import Link from "next/link";

export default function NavbarMenu () {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Menu</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <Link href="/"><DropdownMenuLabel>Home</DropdownMenuLabel></Link>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/books"><DropdownMenuLabel>Book list</DropdownMenuLabel></Link>
            <Link href="/add-book"><DropdownMenuLabel>Add book</DropdownMenuLabel></Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}