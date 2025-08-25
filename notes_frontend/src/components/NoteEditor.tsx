"use client";

import React, { useEffect, useState } from "react";
import type { Note } from "@/lib/api";

/**
 * NoteEditor shows title and content inputs for the selected note.
 */
export default function NoteEditor({
  note,
  onChange,
  onSave,
  saving,
}: {
  note: Note | null;
  onChange: (data: { title: string; content: string }) => void;
  onSave: () => void;
  saving?: boolean;
}) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id, note?.title, note?.content]);

  useEffect(() => {
    onChange({ title, content });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  if (!note) {
    return (
      <div className="h-[calc(100vh-56px)] w-full flex items-center justify-center text-[--muted]">
        Select or create a note to get started
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-56px)] w-full">
      <div className="flex items-center justify-between gap-2 border-b px-4 py-3 bg-white">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title"
          className="w-full rounded-md border px-3 py-2 text-base outline-none focus:ring-2 focus:ring-[--accent]"
        />
        <button
          onClick={onSave}
          disabled={saving}
          className="ml-2 shrink-0 rounded-md px-3 py-2 text-sm text-white bg-[--primary] hover:bg-[--primary-600] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing your note..."
        className="flex-1 w-full resize-none outline-none p-4 text-sm leading-6"
      />
    </div>
  );
}
