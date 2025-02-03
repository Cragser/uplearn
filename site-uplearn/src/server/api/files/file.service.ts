import * as fs from "node:fs";
import * as path from "node:path";

export interface SaveResponseOptions {
  userMessagePreview: string;
  responseBody: unknown;
}

const IS_SERVER = process.env.IS_SERVER === "true";
export async function saveResponseToFile({
  responseBody,
  userMessagePreview,
}: SaveResponseOptions): Promise<void> {
  if (IS_SERVER) {
    return;
  }

  const filesDir = path.join(process.cwd(), "files");
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
  }

  const date = new Date().toISOString();

  const fileName = `response-${userMessagePreview}-${date}.json`;
  const filePath = path.join(filesDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(responseBody, null, 2));
}
