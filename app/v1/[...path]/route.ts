import { readFile } from "node:fs/promises";
import path from "node:path";
import { getReferenceRoot } from "@/lib/v1";

const contentTypes: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const segments = (await params).path;
  const root = getReferenceRoot();
  const assetPath = path.resolve(root, ...segments);
  if (!assetPath.startsWith(`${root}${path.sep}`)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(assetPath);
    const type =
      contentTypes[path.extname(assetPath).toLowerCase()] ??
      "application/octet-stream";
    return new Response(file, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
