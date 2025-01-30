import { useAuth } from "@/providers/Auth";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { Suspense } from "react";

export default function Header() {
  const { loggedUserData } = useAuth();
  return (
    <div className="fixed top-0 z-20 bg-white w-full">
      <ul className="py-3 container mx-auto flex items-center">
        <li>
          <Link
            className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300"
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300"
            href="/following"
          >
            Following
          </Link>
        </li>
        {
          <div className="hidden sm:block w-full">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
        }
        {loggedUserData && (
          <li>
            <Link
              className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300"
              href={`/${loggedUserData.username}`}
            >
              Profile
            </Link>
          </li>
        )}
        <li>
          <Link
            className="px-4 py-2 font-bold rounded-3xl hover:bg-gray-300"
            href={`/settings`}
          >
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}
