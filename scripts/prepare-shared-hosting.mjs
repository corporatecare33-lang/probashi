import { cp, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");

if (!existsSync(clientDir)) {
  throw new Error("dist/client was not found. Run the Vite build before preparing shared hosting files.");
}

await cp(clientDir, distDir, {
  recursive: true,
  force: true,
});

const shellPath = path.join(distDir, "_shell.html");
if (existsSync(shellPath)) {
  const shellHtml = await readFile(shellPath, "utf8");
  await writeFile(
    path.join(distDir, "index.html"),
    shellHtml
      .replaceAll('href="/./assets/', 'href="./assets/')
      .replaceAll('src="/./assets/', 'src="./assets/')
      .replaceAll('href="/favicon.png"', 'href="./favicon.png"'),
  );
  await rm(shellPath, { force: true });
}

await writeFile(
  path.join(distDir, ".htaccess"),
  `DirectoryIndex index.html

RewriteEngine On
RewriteBase /

# Keep real files and folders working normally.
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Send app routes like /employer, /login, and /login?tab=signin to the SPA.
# Query strings are preserved by default.
RewriteRule ^(employer|login)/?$ index.html [L]
RewriteRule ^ index.html [L]
`,
);

await rm(clientDir, { recursive: true, force: true });
await rm(serverDir, { recursive: true, force: true });

console.log("Shared hosting files are ready in dist/. Upload the contents of dist to public_html.");
