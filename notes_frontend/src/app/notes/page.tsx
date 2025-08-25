"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import TopBar from "@/components/TopBar";
import Sidebar from "@/components/Sidebar";
import NoteEditor from "@/components/NoteEditor";
import Spinner from "@/components/Spinner";
import {
  listNotes,
  createNote,
  updateNote,
  deleteNote,
  type Note,
} from "@/lib/api";

/**
 * NotesPage renders the full layout: TopBar, Sidebar, and NoteEditor.
 * It manages note list, selection, and CRUD operations via the REST API.
 */
export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const draftRef = useRef<{ title: string; content: string }>({
    title: "",
    content: "",
  });

  useEffect(() => {
    const ctrl = new AbortController();
    setLoading(true);
    listNotes(ctrl.signal)
      .then((data) => {
        // Sort by updatedAt desc if available
        const sorted = [...data].sort((a, b) => {
          const ta = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const tb = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return tb - ta;
        });
        setNotes(sorted);
        if (sorted.length > 0) {
          setSelectedId(sorted[0].id);
        }
        setError(null);
      })
      .catch((e: unknown) => {
        const msg =
          typeof e === "object" && e !== null && "message" in e
            ? String((e as { message?: unknown }).message || "Unknown error")
            : typeof e === "string"
            ? e
            : "Unknown error";
        setError(msg);
      })
      .finally(() => setLoading(false));
    return () => ctrl.abort();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        (n.title || "").toLowerCase().includes(q) ||
        (n.content || "").toLowerCase().includes(q)
    );
  }, [notes, search]);

  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) ?? null,
    [notes, selectedId]
  );

  const handleNew = async () => {
    try {
      setSaving(true);
      const created = await createNote({
        title: "Untitled",
        content: "",
      });
      setNotes((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setError(null);
    } catch (e: unknown) {
      const msg =
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message || "Failed to create note")
          : "Failed to create note";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (!selectedId) return;
    const payload = { ...draftRef.current };
    try {
      setSaving(true);
      const updated = await updateNote(selectedId, payload);
      setNotes((prev) =>
        prev.map((n) => (n.id === selectedId ? { ...n, ...updated } : n))
      );
      setError(null);
    } catch (e: unknown) {
      const msg =
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message || "Failed to save note")
          : "Failed to save note";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this note? This cannot be undone.");
    if (!ok) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedId === id) {
        const remaining = notes.filter((n) => n.id !== id);
        setSelectedId(remaining[0]?.id ?? null);
      }
      setError(null);
    } catch (e: unknown) {
      const msg =
        typeof e === "object" && e !== null && "message" in e
          ? String((e as { message?: unknown }).message || "Failed to delete note")
          : "Failed to delete note";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[--background] text-[--secondary]">
      <TopBar onNew={handleNew} />
      <div className="flex">
        <Sidebar
          notes={filtered}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onDelete={handleDelete}
          onSearch={setSearch}
          search={search}
          loading={loading}
        />
        <main className="flex-1">
          {error && (
            <div className="mx-4 my-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          {loading ? (
            <div className="h-[calc(100vh-56px)] w-full flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <NoteEditor
              note={selected}
              onChange={(data) => {
                draftRef.current = data;
              }}
              onSave={handleSave}
              saving={saving}
            />
          )}
        </main>
      </div>
    </div>
  );
}
