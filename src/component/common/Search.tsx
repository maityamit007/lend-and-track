import React from 'react'

function Search({
    query,
    setQuery,
    setPage,
    cn,
}:{
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    cn: Function;
}) {
    return (
        <div className="relative w-full md:w-80">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300/70" />
            <input
                value={query}
                onChange={(e) => {
                    setPage(1);
                    setQuery(e.target.value);
                }}
                placeholder="Search name, role, location..."
                className={cn(
                    "w-full rounded-2xl border border-white/20 bg-white/10 px-10 py-3",
                    "text-white placeholder:text-slate-300/60 backdrop-blur-xl",
                    "focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                )}
            />
        </div>
    )
}

export default Search