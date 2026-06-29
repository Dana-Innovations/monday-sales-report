import { readFileSync } from 'fs';
import { join } from 'path';

// Node runtime so fs is available; dynamic so the protected report is never statically cached.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  const root = process.cwd();
  const shell = readFileSync(join(root, 'index.html'), 'utf8');
  const manifest = JSON.parse(readFileSync(join(root, 'data', 'manifest.json'), 'utf8'));
  const weeks = manifest.weeks.map((f: string) =>
    JSON.parse(readFileSync(join(root, 'data', 'weeks', f), 'utf8'))
  );
  const ytd = JSON.parse(readFileSync(join(root, 'data', 'ytd.json'), 'utf8'));
  const payload = JSON.stringify({ weeks, ytd }).replace(/</g, '\\u003c');
  const dataScript = `<script>window.__REPORT_DATA__ = ${payload};</script>`;
  const html = shell.replace('<!--__REPORT_DATA__-->', dataScript);
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
