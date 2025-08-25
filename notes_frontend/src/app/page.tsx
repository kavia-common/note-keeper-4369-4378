"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/notes");
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <h1 className="text-black text-2xl font-light">Loading…</h1>
    </main>
  );
}
