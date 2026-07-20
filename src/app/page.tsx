import supabase from '@/lib/supabase';
import Link from 'next/link';
import PaginationInput from '@/components/PaginationInput';
import PaginationEllipsis from '@/components/PaginationEllipsis';
import SearchBar from '@/components/SearchBar';

export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; query?: string } | undefined> }) {
    const resolvedSearchParams = await searchParams;

    const currentPage = resolvedSearchParams?.page ? parseInt(resolvedSearchParams.page) : 1;
    const itemsPerPage = 20;
    const offset = (currentPage - 1) * itemsPerPage;

    const searchQuery = resolvedSearchParams?.query || '';

    let dbQuery = supabase
        .from('steam_game')
        .select('*', { count: 'exact' })
        .order('app_id', { ascending: true })
        .range(offset, offset + itemsPerPage - 1);

    if (searchQuery) {
        dbQuery = dbQuery.ilike('name', `%${searchQuery}%`);
    }

    const { data: steam_games, count, error } = await dbQuery;

    const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;
    // console.log(steam_games!.length)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-white text-center">Is It Underrated?</h1>
            <SearchBar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                {error && <p>Error: {error.message}</p>}
                {steam_games?.map((game) => (
                    <Link key={game.app_id} href={`/game/${game.app_id}?from=${currentPage}&query=${searchQuery}`} className="flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <article className="flex flex-col bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                            <img src={game.header_image} alt={game.name} className="w-full aspect-[460/215] object-cover"/>
                            <div className="p-4 flex flex-col flex-grow">
                                <h2>{game.name}</h2>
                                <p>{game.description}</p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
            {/* <div className="flex justify-center mt-4">
                <Link  href={`/?page=${currentPage - 1}`} className={`px-4 py-2 mx-1 bg-slate-700 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Previous
                </Link>
                <PaginationInput totalPages={totalPages} currentPage={currentPage} />
                <Link href={`/?page=${currentPage + 1}`} className={`px-4 py-2 mx-1 bg-slate-700 text-white rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Next
                </Link>
            </div> */}
            <PaginationEllipsis totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}