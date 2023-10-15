"use client";
import UserCard from "@/components/shared/Usercard";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter();

  function handleClick(gr: number) {
    router.push(`/${gr}`);
  }

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (query.length <= 2) {
          setSearchResults([]);
          return;
        }
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.body);
        } else {
          console.error("Search request failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    handleSearch();
  }, [query]);

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>User Search</h1>

      <div className="relative w-64">
        <input
          type="text"
          className="h-10 px-5 pr-10 rounded-full text-sm focus:outline-none focus:border border-gray-300 w-full"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon
          className="absolute top-0 right-0  mt-1 mr-2 cursor-pointer"
          height={28}
          width={28}
        />
      </div>

      <div className="mt-14 flex flex-col gap-9">
        {searchResults.length > 0 ? (
          searchResults.map((user: any) => (
            <div key={user.id} onClick={() => handleClick(user.gr_no)}>
              <UserCard
                first_name={user.first_name}
                last_name={user.last_name}
                gr_no={user.gr_no}
                branch={user.branch}
                email={user.email}
              />
            </div>
          ))
        ) : (
          <p>No search results found.</p>
        )}
      </div>
    </div>
  );
}
