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

    const score = game.underrated_score;
    
    let cardGlow = "bg-slate-800 border-slate-700 shadow-2xl";
    let scoreText = "text-white";
    let scoreLabel = "";

    if (score >= 90) {
        cardGlow = "bg-slate-900 border border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.3)]";
        scoreText = "bg-gradient-to-t from-red-600 via-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,165,0,0.8)]";
        scoreLabel = "🔥 Legendary 🔥";
    } else if (score >= 80) {
        cardGlow = "bg-slate-800 border border-orange-500/30 shadow-[0_0_25px_rgba(249,115,22,0.2)]";
        scoreText = "text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]";
        scoreLabel = "Radiant Gem";
    } else if (score >= 70) {
        cardGlow = "bg-slate-800 border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)]";
        scoreText = "text-yellow-400 drop-shadow-[0_0_5px_rgba(234,179,8,0.3)]";
        scoreLabel = "Recommended";
    }

    return (
        <main className="min-h-screen p-8 text-slate-200 flex flex-col items-center">
            <div className="w-full max-w-4xl mb-6">
                <Link href={backUrl} className="text-blue-400 hover:text-blue-300 transition-colors">
                    &larr; Go Back
                </Link>
            </div>

            <article className={`w-full max-w-4xl rounded-2xl overflow-hidden transition-all duration-500 ${cardGlow}`}>
                <div className="flex flex-col md:flex-row bg-black/40 border-b border-slate-700/50">
                    <div className="flex-1 flex flex-col justify-center items-center p-8">
                        <span className="text-slate-400 text-sm uppercase tracking-[0.3em] font-semibold mb-2">
                            Underrated Score
                        </span>
                        <span className={`text-8xl font-black tracking-tighter ${scoreText}`}>
                            {score}
                        </span>
                        <span className={`mt-2 text-xs uppercase tracking-widest font-bold ${score >= 90 ? 'text-red-400' : score >= 80 ? 'text-orange-400' : 'text-slate-500'}`}>
                            {scoreLabel}
                        </span>
                    </div>
                    <div className="w-full md:w-[460px] md:h-[215px] flex-shrink-0">
                        <img 
                            src={game.header_image} 
                            alt={game.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

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
                        
                        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50">
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