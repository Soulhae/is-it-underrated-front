import Link from "next/link";

export default function PaginationEllipsis({ totalPages, currentPage }: { totalPages: number; currentPage: number; }) {
    // Algoritmo matemático para calcular el rango de botones a mostrar
    const getPageNumbers = () => {
        const delta = 2; // Cuántos botones mostrar a la izquierda y derecha de la página actual
        const range = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift("...");
        }
        if (currentPage + delta < totalPages - 1) {
            range.push("...");
        }

        range.unshift(1); // Siempre mostramos la página 1
        if (totalPages > 1) {
            range.push(totalPages); // Siempre mostramos la última página
        }

        return range;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center space-x-1">
            {pages.map((page, index) => {
                if (page === "...") {
                    return (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-500">
                            ...
                        </span>
                    );
                }

                const isCurrent = page === currentPage;
                
                return (
                    <Link
                        key={`page-${page}`}
                        href={`/?page=${page}`}
                        className={`px-4 py-2 rounded transition-colors ${
                            isCurrent
                                ? "bg-blue-600 text-white font-bold"
                                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                    >
                        {page}
                    </Link>
                );
            })}
        </div>
    );
}