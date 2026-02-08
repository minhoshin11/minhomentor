import { Section06Payload } from "@/Types/FormType";

export async function SaveToGoogleSheets(payload: Section06Payload) {
  const url = process.env.SECTION06_SHEETS_WEBAPP_URL;
  if (!url) throw new Error("SECTION06_SHEETS_WEBAPP_URL is missing");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Google Sheets WebApp error: ${res.status} ${text}`);
  }

  return true;
}