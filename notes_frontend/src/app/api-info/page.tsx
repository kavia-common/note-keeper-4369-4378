export const dynamic = "force-static";

export default function ApiInfo() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-semibold mb-4 text-[--secondary]">Backend API Expectations</h1>
      <p className="text-[--muted] mb-6">
        Configure the backend base URL via <code className="px-1 py-0.5 rounded bg-gray-100">NEXT_PUBLIC_BACKEND_URL</code>.
        The Notes frontend expects the following REST endpoints:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-sm">
        <li>GET <code className="px-1 py-0.5 rounded bg-gray-100">/api/notes</code> – list notes</li>
        <li>POST <code className="px-1 py-0.5 rounded bg-gray-100">/api/notes</code> – create note {`{title, content}`}</li>
        <li>GET <code className="px-1 py-0.5 rounded bg-gray-100">/api/notes/:id</code> – get single note</li>
        <li>PUT <code className="px-1 py-0.5 rounded bg-gray-100">/api/notes/:id</code> – update note {`{title, content}`}</li>
        <li>DELETE <code className="px-1 py-0.5 rounded bg-gray-100">/api/notes/:id</code> – delete note</li>
      </ul>
      <p className="text-[--muted] mt-6">
        Ensure the backend includes CORS for requests from this frontend origin if required.
      </p>
    </main>
  );
}
