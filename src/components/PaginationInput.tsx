"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaginationInput({ totalPages, currentPage }: { totalPages: number; currentPage: number; }) {
    const [page, setPage] = useState(currentPage);
    const router = useRouter();

    useEffect(() => {
        setPage(currentPage);
    }, [currentPage]);

    const handleNavigate = (newPage: number) => {
        const validPage = Math.min(Math.max(1, newPage), totalPages);
        setPage(validPage);
        router.push(`/?page=${validPage}`);
    };

    return (
        <div className="flex items-center text-slate-300 font-medium">
            <span className="mr-2">Página</span>
            <input
                type="number"
                min={1}
                max={totalPages}
                value={page}
                onChange={(e) => setPage(parseInt(e.target.value) || 1)}
                onBlur={() => handleNavigate(page)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleNavigate(page);
                    }
                }}
                className="w-16 px-2 py-1 text-center bg-slate-800 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="ml-2">de {totalPages}</span>
        </div>
    );
}