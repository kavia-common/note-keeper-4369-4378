"use client";

import React from "react";

/**
 * TopBar displays the app title and a global "New Note" button.
 */
export default function TopBar({
  onNew,
}: {
  onNew: () => void;
}) {
  return (
    <div className="h-14 flex items-center justify-between border-b bg-white/90 backdrop-blur px-4">
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded bg-[--accent] inline-block"
          aria-hidden
        />
        <h1 className="text-[--secondary] font-medium">Note Keeper</h1>
      </div>
      <button
        onClick={onNew}
        className="rounded-md px-3 py-1.5 text-sm text-white bg-[--primary] hover:bg-[--primary-600] transition-colors"
      >
        New Note
      </button>
    </div>
  );
}
