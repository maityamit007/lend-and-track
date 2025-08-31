import React, { useMemo, useState } from "react";
import { seedData } from "@/utils/globalUtils";

function cn(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

type Row = {
    id: number;
    name: string;
    role: string;
    location: string;
    score: number;
    status: string;
};

type SortKey = keyof Pick<Row, "name" | "role" | "location" | "score" | "status">;

const columns = [
    { key: "name", label: "Name" },
    { key: "role", label: "Role" },
    { key: "location", label: "Location" },
    { key: "score", label: "Score" },
    { key: "status", label: "Status" },
];

type columnProps = {
    key: string;
    label: string;
}

export default function GlassyTable({
    columns = []
}: {
    columns?: columnProps[]
}) {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "score", dir: "desc" });
    const [page, setPage] = useState(1);
    const pageSize = 6;

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return seedData.filter((r: Row) =>
            [r.name, r.role, r.location, r.status].some((f) =>
                String(f).toLowerCase().includes(q)
            )
        );
    }, [query]);

    const sorted = useMemo(() => {
        const arr = [...filtered];
        arr.sort((a, b) => {
            const vA = a[sort.key];
            const vB = b[sort.key];
            if (typeof vA === "number" && typeof vB === "number") {
                return sort.dir === "asc" ? vA - vB : vB - vA;
            }
            return sort.dir === "asc"
                ? String(vA).localeCompare(String(vB))
                : String(vB).localeCompare(String(vA));
        });
        return arr;
    }, [filtered, sort]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const pageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return sorted.slice(start, start + pageSize);
    }, [sorted, page]);

    const toggleSort = (key: any) => {
        setPage(1);
        setSort((prev) => {
            if (prev.key !== key) return { key, dir: "asc" };
            if (prev.dir === "asc") return { key, dir: "desc" };
            return { key, dir: "asc" };
        });
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-soft-light"
                style={{
                    backgroundImage:
                        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.35"/></svg>\')',
                }}
            />

            <div className="mx-auto max-w-6xl px-4 py-16">
                <div
                    //   initial={{ opacity: 0, y: 20 }}
                    //   animate={{ opacity: 1, y: 0 }}
                    //   transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8 flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
                            Lend And Track
                        </h1>
                        <p className="mt-1 text-slate-300/90">
                            Dashboard
                        </p>
                    </div>

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
                </div>

                <div
                    //   initial={{ opacity: 0, scale: 0.98 }}
                    //   animate={{ opacity: 1, scale: 1 }}
                    //   transition={{ duration: 0.5 }}
                    className={cn(
                        "rounded-2xl border border-white/20 bg-white/[0.08] backdrop-blur-2xl",
                        "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] ring-1 ring-white/10 overflow-hidden"
                    )}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="text-slate-200/90">
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className="px-6 py-4 text-sm font-semibold"
                                        >
                                            <button
                                                onClick={() => toggleSort(col.key)}
                                                className="inline-flex items-center gap-1.5 hover:opacity-90"
                                            >
                                                {col.label}
                                                ⬇️⬆️
                                            </button>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pageData.map((row, idx) => (
                                    <tr
                                        key={row.id}
                                        className={cn(
                                            "group border-t border-white/10",
                                            idx % 2 === 1 ? "bg-white/[0.02]" : "bg-transparent"
                                        )}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 shrink-0 rounded-xl bg-gradient-to-br from-cyan-400/70 to-violet-500/70 ring-1 ring-white/20 shadow-md" />
                                                <div>
                                                    <div className="font-medium text-white drop-shadow-sm">
                                                        {row.name}
                                                    </div>
                                                    <div className="text-xs text-slate-300/80">
                                                        #{row.id.toString().padStart(4, "0")}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-100/95">{row.role}</td>
                                        <td className="px-6 py-4 text-slate-100/95">
                                            {row.location}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold",
                                                    "border border-white/20 bg-white/10 text-white/90 backdrop-blur",
                                                    row.score >= 90 && "ring-1 ring-cyan-400/40",
                                                    row.score < 75 && "opacity-90"
                                                )}
                                            >
                                                {row.score}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90",
                                                    "shadow-sm backdrop-blur group-hover:translate-x-[1px] transition-transform",
                                                    row.status === "Active" &&
                                                    "ring-1 ring-emerald-400/40",
                                                    row.status === "Busy" && "ring-1 ring-amber-400/40",
                                                    row.status === "Away" && "ring-1 ring-sky-400/40"
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "h-2.5 w-2.5 rounded-full",
                                                        row.status === "Active" && "bg-emerald-400",
                                                        row.status === "Busy" && "bg-amber-400",
                                                        row.status === "Away" && "bg-sky-400"
                                                    )}
                                                />
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="flex flex-col gap-3 border-t border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
                        <div className="text-sm text-slate-200/80">
                            Showing{" "}
                            <span className="font-semibold text-white">
                                {pageData.length}
                            </span>{" "}
                            of {filtered.length} results
                            {query && (
                                <span className="ml-2 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/80">
                                    filtered
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 self-end md:self-auto">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={cn(
                                    "inline-flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/80",
                                    "backdrop-blur hover:bg-white/15 disabled:opacity-50"
                                )}
                            >
                                ← Prev
                            </button>
                            <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/80 backdrop-blur">
                                Page <span className="font-semibold text-white">{page}</span> /{" "}
                                {totalPages}
                            </div>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={cn(
                                    "inline-flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white/80",
                                    "backdrop-blur hover:bg-white/15 disabled:opacity-50"
                                )}
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tiny legend */}
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-300/80">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                        Glassy UI
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                        Backdrop blur
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                        Framer Motion
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
                        Tailwind
                    </span>
                </div>
            </div>
        </div>
    );
}
