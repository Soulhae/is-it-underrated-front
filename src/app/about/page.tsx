import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="min-h-screen p-8 text-slate-200 flex flex-col items-center py-12">
            <div className="w-full max-w-3xl mb-8">
                <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                    &larr; Go Back
                </Link>
            </div>

            <article className="w-full max-w-3xl bg-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700 shadow-xl">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                    The science behind <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Is It Underrated?</span>
                </h1>

                <section className="mb-10 text-lg text-slate-300 leading-relaxed space-y-4">
                    <p>
                        The Steam store receives thousands of new games every year. Traditional recommendation algorithms tend to create a "snowball effect," favoring AAA titles or massively popular games, leaving authentic niche gems buried.
                    </p>
                    <p>
                        <strong>Is It Underrated?</strong> was born to solve this problem through data collection, transformation, and statistical analysis. Instead of relying on raw popularity, we use a proprietary mathematical model to identify high-quality games that have gone unnoticed by the mainstream market.
                    </p>
                </section>

                <hr className="border-slate-700 mb-10" />

                <section className="mb-10">
                    <h2 className="text-2xl font-bold text-white mb-6">The Algorithm: The Underrated Score</h2>
                    <p className="text-slate-300 mb-6">
                        Our ETL (Extract, Transform, Load) engine updates metrics daily and calculates a score from 0 to 100 based on four fundamental pillars:
                    </p>

                    <div className="grid gap-6">
                        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-emerald-400 font-bold mb-2">1. Proven Quality (Weight: 60%)</h3>
                            <p className="text-sm text-slate-400">We analyze the exact ratio of positive reviews to total reviews. A game requires a strict minimum of 100 reviews to be considered statistically relevant.</p>
                        </div>
                        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-blue-400 font-bold mb-2">2. Hidden Factor (Weight: 30%)</h3>
                            <p className="text-sm text-slate-400">We penalize mass popularity. We set a threshold of 3,000 reviews; as a game approaches this number, its "Niche" multiplier decreases until it disappears. If the whole world knows it, it is not underrated.</p>
                        </div>
                        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700">
                            <h3 className="text-purple-400 font-bold mb-2">3. Logarithmic Vitality (Weight: 10%)</h3>
                            <p className="text-sm text-slate-400">We reward games that maintain an active community. We use a logarithmic scale to grant a fair bonus without distorting the maximum score.</p>
                        </div>
                        <div className="bg-slate-900/80 p-6 rounded-xl border border-red-900/30">
                            <h3 className="text-red-400 font-bold mb-2">4. Survival Penalty</h3>
                            <p className="text-sm text-slate-400">Even great masterpieces die. If a title registers 10 concurrent players or fewer at the time of data extraction, its final score suffers a 25% penalty, ensuring we recommend experiences that can still be enjoyed.</p>
                        </div>
                    </div>
                </section>

                <hr className="border-slate-700 mb-10" />

                <section>
                    <h2 className="text-2xl font-bold text-white mb-6">Technical Architecture</h2>
                    <ul className="list-disc list-inside text-slate-300 space-y-2 marker:text-blue-500">
                        <li><strong>Frontend:</strong> Next.js (App Router), React, Tailwind CSS.</li>
                        <li><strong>Database:</strong> PostgreSQL hosted on Supabase, secured with Row Level Security (RLS).</li>
                        <li><strong>Data Pipeline:</strong> Custom ETL script in Node.js to interact defensively with the Steam Web API.</li>
                        <li><strong>Deployment:</strong> Vercel (UI Hosting), GitHub Actions (Automated Cron Jobs).</li>
                    </ul>
                </section>
                
                <div className="mt-12 text-center text-slate-500 text-sm">
                    <p>
                        Developed by{' '}
                        <a 
                            href="https://github.com/Soulhae" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                        >
                            Benjamín Herrera Arancibia
                        </a>
                    </p>
                </div>
            </article>
        </main>
    );
}