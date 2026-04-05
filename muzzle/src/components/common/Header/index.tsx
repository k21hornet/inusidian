import Link from "next/link";
import { UserIcon } from "./UserIcon";
import { Menu } from "lucide-react";

export const Header = () => {
  return (
    <>
      {/* Desktop */}
      <header className="fixed z-1000 top-0 right-0 left-0 hidden md:flex items-center justify-center h-16">
        <div className="flex items-center justify-between w-full max-w-7xl px-4 md:px-16">
          <div className="flex-1">
            <Link href="/home" className="no-underline">
              <span className="no-underline text-[28px] font-bold bg-linear-to-r from-[#40c4ff] to-[#2962ff] bg-clip-text text-transparent">
                INUSIDIAN
              </span>
            </Link>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <UserIcon />
          </div>
        </div>
      </header>

      {/* Mobile */}
      <header className="fixed z-1000 top-0 left-0 right-0 flex md:hidden justify-center items-center h-16">
        <div className="flex justify-between items-center w-full max-w-7xl px-2 md:px-8">
          <div className="flex items-center gap-2">
            <Menu className="w-6 h-6" />
            <Link href="/home" className="no-underline">
              <span className="no-underline text-[28px] font-bold inline-block bg-linear-to-r from-[#40c4ff] to-[#2962ff] bg-clip-text text-transparent">
                INUSIDIAN
              </span>
            </Link>
          </div>

          <div className="flex-1 flex justify-end items-center">
            <UserIcon />
          </div>
        </div>
      </header>
    </>
  );
};
