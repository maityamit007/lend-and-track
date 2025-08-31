import React, { useMemo, useState } from "react";
import { Breadcrumb } from "./BreadCrumb";

function cn(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

type SortKey = keyof Pick<Row, "name" | "last_lent_date" | "amount" | "status">;

type columnProps = {
    key: string;
    label: string;
}

export default function GlassyTable({
    columns = [],
    tableData
}: {
    columns?: columnProps[],
    tableData: any[]
}) {
    const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "amount", dir: "desc" });
    const [page, setPage] = useState(1);
    const pageSize = 6;


    const sorted = useMemo(() => {
        const arr = tableData;
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
    }, [sort]);

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
                                        {` ⬇⬆`}
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
                                <td className="px-6 py-4 text-slate-100/95">{row.last_lent_date}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={cn(
                                            "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold",
                                            "border border-white/20 bg-white/10 text-white/90 backdrop-blur",
                                            row.amount >= 90 && "ring-1 ring-cyan-400/40",
                                            row.amount < 75 && "opacity-90"
                                        )}
                                    >
                                        {row.amount}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90",
                                            "shadow-sm backdrop-blur group-hover:translate-x-[1px] transition-transform",
                                            row.status === "Active" &&
                                            "ring-1 ring-emerald-400/40",
                                            row.status === "Inactive" && "ring-1 ring-red-400/40",
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "h-2.5 w-2.5 rounded-full",
                                                row.status === "Active" && "bg-emerald-400",
                                                row.status === "Inactive" && "bg-red-400",
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
                    of {tableData.length} results
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
    );
}
