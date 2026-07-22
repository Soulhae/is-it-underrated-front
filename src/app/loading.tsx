export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold text-white text-center mb-6">Is It Underrated?</h1>
            
            <div className="w-full max-w-2xl mb-2 px-2">
                <div className="w-full h-[42px] bg-slate-800 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6 w-full">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex flex-col h-[320px] bg-slate-800 border border-slate-700 rounded-xl overflow-hidden animate-pulse">
                        <div className="w-full aspect-[460/215] bg-slate-700"></div>
                        <div className="p-4 flex flex-col flex-grow gap-4">
                            <div className="h-5 bg-slate-700 rounded w-3/4"></div>
                            <div className="h-3 bg-slate-700 rounded w-full"></div>
                            <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                            <div className="mt-auto flex justify-between">
                                <div className="h-3 bg-slate-700 rounded w-1/3"></div>
                                <div className="h-3 bg-slate-700 rounded w-1/3"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}