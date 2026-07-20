"use client"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useDebounce from "@/lib/useDebounce";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [query, setQuery] = useState(searchParams.get("query") || "");
    const debouncedQuery = useDebounce(query || "", 300);

    useEffect(() => {  

        const currentUrlQuery = searchParams.get("query") || "";

        if (debouncedQuery === currentUrlQuery) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());

        if (debouncedQuery) {
            params.set("query", debouncedQuery);
        } else {
            params.delete("query");
        }

        params.set("page", "1");    

        replace(`${pathname}?${params.toString()}`);

    }, [debouncedQuery, pathname, replace]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
}