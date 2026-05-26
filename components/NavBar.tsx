import { Plus, ScanFace } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const NavBar = () => {
  return (
    <header className="w-full  px-6 py-4 bg-[#00000036]">
      <nav className="flex flex-row justify-between max-sm:flex-col max-sm:items-center max-sm:gap-6">
        <Link
          href="/"
          className="font-light text-xl flex flex-row gap-3 items-center"
        >
          <ScanFace />
          DevEvents
        </Link>
        <div className="flex flex-row gap-6">
          <Link
            href="/"
            className="font-regular text-md flex flex-row gap-3 items-center"
          >
            Home
          </Link>
          <Link
            href="/"
            className="font-regular text-md flex flex-row gap-3 items-center"
          >
            Events
          </Link>
          <Link
            href="/"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            <Plus />
            Create Event
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
