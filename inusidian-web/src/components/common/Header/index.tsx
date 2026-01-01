import Link from "next/link";
import { UserIcon } from "./UserIcon";
import { SPMenu } from "./SPMenu";

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
          <nav className="flex items-center gap-16">
            <div className="flex justify-between items-center cursor-pointer">
              <Link
                href="/home"
                className="font-bold no-underline text-inherit"
              >
                ホーム
              </Link>
            </div>

            <div className="flex justify-between items-center cursor-pointer">
              <Link
                href="/decks"
                className="font-bold no-underline text-inherit"
              >
                デッキ一覧
              </Link>
            </div>

            <div className="flex justify-between items-center cursor-pointer">
              <Link
                href="/statistics"
                className="font-bold no-underline text-inherit"
              >
                統計
              </Link>
            </div>

            <div className="flex justify-between items-center cursor-pointer">
              <Link
                href="/learning-goals"
                className="font-bold no-underline text-inherit"
              >
                学習目標
              </Link>
            </div>
          </nav>
          <div className="flex-1 flex justify-end items-center">
            <UserIcon />
          </div>
        </div>
      </header>

      {/* Mobile */}
      <header className="fixed z-1000 top-0 left-0 right-0 flex md:hidden justify-center items-center h-16">
        <div className="flex justify-between items-center w-full max-w-7xl px-2 md:px-8">
          <div className="flex items-center gap-2">
            <SPMenu />
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
