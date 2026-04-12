import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";

export const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center px-4 py-3">
        <div className="flex-1">
          <Link href="/home">
            <span className="bg-linear-to-r from-[#40c4ff] to-[#2962ff] bg-clip-text text-[28px] font-bold text-transparent no-underline">
              INUSIDIAN
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-1 text-sm">
          <Link
            href="/auth/logout"
            className="flex items-center gap-1"
            prefetch={false}
          >
            <span className="hidden md:flex">ログアウト</span>
            <MdOutlineLogout className="text-lg" />
          </Link>
        </div>
      </div>
    </header>
  );
};
