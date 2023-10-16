"use client";
import UserCard from "@/components/shared/Usercard";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      first_name: "Suresh",
      last_name: "Paulraj",
      gr_no: 211180,
      branch: "Computer Engineering",
      email: "suresh.211180@srttc.ac.in",
      isAdmin: true,
    },
    {
      first_name: "Vinay",
      last_name: "Madarkhandi",
      gr_no: 211147,
      branch: "AI&DS",
      email: "vinay.211147@srttc.ac.in",
      isAdmin: true,
    },
  ]);

  const [suggest, setSuggested] = useState([
    {
      id: 1,
      first_name: "Suresh",
      last_name: "Paulraj",
      gr_no: 211180,
      branch: "Computer Engineering",
      email: "suresh.211180@srttc.ac.in",
      isAdmin: true,
    },
    {
      first_name: "Vinay",
      last_name: "Madarkhandi",
      gr_no: 211147,
      branch: "AI&DS",
      email: "vinay.211147@srttc.ac.in",
      isAdmin: true,
    },
  ]);

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
          console.log(data.body);
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
      <div className="relative w-80">
        <input
          type="text"
          className="h-10 px-5 pr-10 rounded-full text-sm border-gray-300 focus:border  w-full"
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
            <div
              key={user.id}
              className="cursor-pointer"
              onClick={() => handleClick(user.gr_no)}
            >
              <UserCard
                first_name={user.first_name}
                last_name={user.last_name}
                gr_no={user.gr_no}
                branch={user.branch}
                email={user.email}
                admin={user.isAdmin}
              />
            </div>
          ))
        ) : (
          <>
            <h1>Suggested Users</h1>
            {suggest.map((user: any) => (
              <div
                key={user.id}
                className="cursor-pointer"
                onClick={() => handleClick(user.gr_no)}
              >
                <UserCard
                  first_name={user.first_name}
                  last_name={user.last_name}
                  gr_no={user.gr_no}
                  branch={user.branch}
                  email={user.email}
                  admin={user.isAdmin}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
