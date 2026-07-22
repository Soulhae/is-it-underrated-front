export default function Loading() {
    return (
        <main className="min-h-screen p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl mb-6">
                <div className="w-24 h-6 bg-slate-800 rounded animate-pulse"></div>
            </div>

            <article className="w-full max-w-4xl rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl animate-pulse">
                <div className="flex flex-col md:flex-row bg-black/40 border-b border-slate-700/50">
                    <div className="flex-1 flex flex-col justify-center items-center p-8 space-y-4">
                        <div className="w-40 h-4 bg-slate-700 rounded"></div>
                        <div className="w-32 h-24 bg-slate-700 rounded-lg"></div>
                        <div className="w-28 h-4 bg-slate-700 rounded"></div>
                    </div>
                    <div className="w-full md:w-[460px] h-[215px] bg-slate-700 flex-shrink-0"></div>
                </div>

                <div className="p-8">
                    <div className="w-3/4 md:w-1/2 h-10 bg-slate-700 rounded mb-8"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <div className="w-28 h-4 bg-slate-700 rounded mb-4"></div>
                            <div className="space-y-3">
                                <div className="w-full h-4 bg-slate-700 rounded"></div>
                                <div className="w-full h-4 bg-slate-700 rounded"></div>
                                <div className="w-5/6 h-4 bg-slate-700 rounded"></div>
                                <div className="w-4/6 h-4 bg-slate-700 rounded"></div>
                            </div>
                            <div className="w-32 h-4 bg-slate-700 rounded mt-6"></div>
                        </div>
                        
                        <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700/50">
                            <div className="w-32 h-4 bg-slate-700 rounded mb-6"></div>
                            <ul className="space-y-4">
                                <li className="flex justify-between">
                                    <div className="w-24 h-4 bg-slate-700 rounded"></div>
                                    <div className="w-16 h-4 bg-slate-700 rounded"></div>
                                </li>
                                <li className="flex justify-between">
                                    <div className="w-28 h-4 bg-slate-700 rounded"></div>
                                    <div className="w-16 h-4 bg-slate-700 rounded"></div>
                                </li>
                                <li className="flex justify-between items-center">
                                    <div className="w-40 h-4 bg-slate-700 rounded"></div>
                                    <div className="w-16 h-4 bg-slate-700 rounded"></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}