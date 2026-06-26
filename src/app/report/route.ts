import { readFileSync } from 'fs';
import { join } from 'path';

// Node runtime so fs is available; dynamic so the protected report is never statically cached.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
