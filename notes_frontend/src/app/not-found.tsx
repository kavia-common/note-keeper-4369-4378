export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-2xl font-semibold mb-2 text-[--secondary]">Page not found</h1>
      <p className="text-[--muted] mb-4">The page you’re looking for doesn’t exist.</p>
      <a
        href="/notes"
        className="rounded-md px-3 py-2 text-sm text-white bg-[--primary] hover:bg-[--primary-600] transition-colors"
      >
        Go to Notes
      </a>
    </main>
  );
}
