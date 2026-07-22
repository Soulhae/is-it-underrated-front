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
        .order('underrated_score', { ascending: false })
        .order('app_id', { ascending: true })
        .gt('underrated_score', 0)
        .range(offset, offset + itemsPerPage - 1);

    if (searchQuery) {
        dbQuery = dbQuery.ilike('name', `%${searchQuery}%`);
    }

    const { data: steam_games, count, error } = await dbQuery;

    const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

    return (
        <div className="flex flex-col items-center min-h-screen justify-center py-2">
            <nav className="w-full flex justify-end p-2 max-w-[1400px]">
                <Link 
                    href="/about" 
                    className="text-sm font-medium text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 rounded-full px-4 py-2"
                >
                    ¿How does it work? &rarr;
                </Link>
            </nav>
            <div className="flex flex-col items-center w-full mt-4">
                <h1 className="text-3xl md:text-4xl font-black text-white text-center tracking-tight mb-6">
                    Is It Underrated?
                </h1>
                <SearchBar />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
                {error && <p>Error: {error.message}</p>}
                {steam_games?.map((game) => {
                    const score = game.underrated_score;
                    
                    let cardStyle = "bg-slate-800 border-slate-700 shadow-lg";
                    let scoreBadge = "bg-slate-900/80 text-slate-300 font-bold border border-slate-700 shadow-md backdrop-blur-md";
                    let scoreTextClass = ""; 

                    if (score >= 90) {
                        cardStyle = "bg-slate-900 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]";
                        
                        scoreBadge = "bg-slate-900/90 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)] backdrop-blur-md";
                        
                        scoreTextClass = "bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent font-black drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]";
                        
                    } else if (score >= 80) {
                        cardStyle = "bg-slate-800 border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]";
                        scoreBadge = "bg-slate-900/80 text-orange-400 font-bold border border-orange-500/50 shadow-md backdrop-blur-md";
                    } else if (score >= 70) {
                        cardStyle = "bg-slate-800 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.05)] hover:shadow-[0_0_15px_rgba(234,179,8,0.1)]";
                        scoreBadge = "bg-slate-900/80 text-yellow-400 font-bold border border-yellow-500/50 shadow-md backdrop-blur-md";
                    }

                    return (
                        <Link key={game.app_id} href={`/game/${game.app_id}?from=${currentPage}&query=${searchQuery}`} className="block h-full">
                            <article className={`flex flex-col h-full rounded-xl overflow-hidden border hover:-translate-y-1 transition-all duration-300 ${cardStyle}`}>
                                
                                <div className="relative">
                                    <img src={game.header_image} alt={game.name} className="w-full aspect-[460/215] object-cover"/>
                                    
                                    <div className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm ${scoreBadge}`}>
                                        <span className={scoreTextClass}>{score}</span>
                                    </div>
                                </div>
                                
                                <div className="p-4 flex flex-col flex-grow">
                                    <h2 className="font-bold text-white text-lg line-clamp-1 mb-2">{game.name}</h2>
                                    <p className="text-slate-400 text-xs line-clamp-3 mb-4">{game.short_description}</p>
                                    
                                    <div className="mt-auto flex justify-between text-xs font-mono text-slate-500">
                                        <span>{game.total_reviews} Revs</span>
                                        <span>{game.current_players} Plyrs</span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    )
                })}
            </div>
            <PaginationEllipsis totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}