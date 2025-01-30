import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("q") || "";
  const [searchValue, setSearchValue] = useState(searchQuery);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/search/pins/?q=${searchValue}`);
  };
  return (
    <form className="flex-grow mx-2" onSubmit={handleSubmit}>
      <input
        className="rounded-3xl w-full px-4 py-2 bg-gray-200"
        placeholder="Search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
    </form>
  );
}
export default SearchBar;
