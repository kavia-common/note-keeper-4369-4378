"use client";

import React from "react";
import type { Note } from "@/lib/api";

/**
 * Sidebar displays a searchable list of notes and allows selection/deletion.
 */
export default function Sidebar({
  notes,
  selectedId,
  onSelect,
  onDelete,
  onSearch,
  search,
  loading,
}: {
  notes: Note[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onSearch: (value: string) => void;
  search: string;
  loading?: boolean;
}) {
  return (
    <aside className="w-[320px] shrink-0 border-r bg-white h-[calc(100vh-56px)]">
      <div className="p-3">
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search notes…"
          className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[--accent]"
        />
      </div>
      <div className="overflow-y-auto h-[calc(100%-56px-56px)]">
        {loading && (
          <div className="p-3 text-sm text-[--muted]">Loading…</div>
        )}
        {!loading && notes.length === 0 && (
          <div className="p-3 text-sm text-[--muted]">No notes yet</div>
        )}
        <ul className="px-2">
          {notes.map((n) => (
            <li key={n.id}>
              <button
                className={`group w-full text-left px-3 py-2 rounded-md border mb-2 hover:bg-gray-50 transition-colors ${
                  selectedId === n.id ? "border-[--primary]" : "border-transparent"
                }`}
                onClick={() => onSelect(n.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="truncate">
                    <div className="font-medium text-sm text-[--secondary] truncate">
                      {n.title || "Untitled"}
                    </div>
                    {n.updatedAt && (
                      <div className="text-xs text-[--muted]">
                        {new Date(n.updatedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                  <button
                    aria-label="Delete note"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(n.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded transition-opacity"
                  >
                    Delete
                  </button>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
