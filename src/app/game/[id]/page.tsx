import supabase from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({ params, searchParams }: { params: Promise<{ id: string }> | undefined, searchParams: Promise<{ from?: string; query?: string }> | undefined }) {
    const resolvedParams = await params;
    const appId = resolvedParams?.id;

    const resolvedSearchParams = await searchParams;
    const fromPage = resolvedSearchParams?.from ? parseInt(resolvedSearchParams.from) : 1;
    const previousQuery = resolvedSearchParams?.query || '';

    let backUrl = `/?page=${fromPage}`;
    if (previousQuery) {
        // backUrl += `&query=${encodeURIComponent(previousQuery)}`;
        backUrl += `&query=${previousQuery}`;
    }

    const { data: game, error } = await supabase
        .from("steam_game")
        .select("*")
        .eq("app_id", appId)
        .single();

    if (error || !game) {
        notFound();
    }

    return (
        <main className="min-h-screen p-8 text-slate-200 flex flex-col items-center">
            <div className="w-full max-w-4xl mb-6">
                <Link href={backUrl} className="text-blue-400 hover:text-blue-300 transition-colors">
                    &larr; Go Back
                </Link>
            </div>

            <article className="w-full max-w-4xl bg-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                    src={game.header_image} 
                    alt={game.name} 
                    className="w-full aspect-[460/215] object-cover"
                />

                <div className="p-8">
                    <h1 className="text-4xl font-bold text-white mb-4">{game.name}</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-2">Description</h3>
                            <p className="text-lg leading-relaxed">{game.short_description}</p>
                            <a href={`https://store.steampowered.com/app/${game.app_id}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-400 hover:text-blue-300 transition-colors">
                                View on Steam &rarr;
                            </a>
                        </div>
                        
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-slate-400 text-sm uppercase tracking-wider mb-4">Data Analysis</h3>
                            <ul className="space-y-3 font-medium">
                                <li className="flex justify-between">
                                    <span>Total Reviews:</span> 
                                    <span className="text-white">{game.total_reviews?.toLocaleString() || 0}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Positive Reviews:</span> 
                                    <span className="text-green-400">{game.positive_reviews?.toLocaleString() || 0}</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Current Players ({new Date(game.metrics_updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}):</span> 
                                    <span className="text-blue-400">{game.current_players?.toLocaleString() || 0}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}