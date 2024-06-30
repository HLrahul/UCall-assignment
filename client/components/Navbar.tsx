import { ThemeModeToggle } from "./themeToggle";

import NavbarMenu from "./navbarMenu";

export default function Navbar () {
    return (
      <nav className="h-[4rem] w-[90%] lg:w-[75%] md:w-[90%] m-auto flex">
        {/* left side contents */}
        <div className="w-[50%] h-full flex items-center justify-start">
          <p className="text-[1.25rem] font-bold tracking-wider">U-BOOKs</p>
        </div>

        {/* right side contents */}
        <div className="w-[50%] h-full flex gap-2 items-center justify-end">
          <ThemeModeToggle />

          <NavbarMenu />
        </div>
      </nav>
    );
}