import { NextResponse } from "next/server";

export const dynamic = "force-static";

export function GET() {
  const body = `User-agent: *
Allow: /
Sitemap: /sitemap.xml
`;
  return new NextResponse(body, {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
