import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const host = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const urls = ["", "/notes", "/health"].map(
    (p) => `<url><loc>${host}${p}</loc></url>`
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;
  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
