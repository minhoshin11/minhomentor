// import { NextResponse } from "next/server";

// type LeadPayload = {
//   name?: string;
//   phone?: string;
//   course?: string;
//   branch?: string;
//   memo?: string;
// };

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as LeadPayload;

//     const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
//     if (!webhookUrl) {
//       return NextResponse.json(
//         { ok: false, error: "DISCORD_WEBHOOK_URL is missing" },
//         { status: 500 }
//       );
//     }

//     const text = [
//       "📩 새 폼 접수",
//       body.name ? `- 이름: ${body.name}` : null,
//       body.phone ? `- 연락처: ${body.phone}` : null,
//       body.course ? `- 과정: ${body.course}` : null,
//       body.branch ? `- 지점: ${body.branch}` : null,
//       body.memo ? `- 메모: ${body.memo}` : null,
//       `- 시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
//     ]
//       .filter(Boolean)
//       .join("\n");

//     const res = await fetch(webhookUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ content: text }),
//     });

//     if (!res.ok) {
//       const errText = await res.text().catch(() => "");
//       return NextResponse.json(
//         { ok: false, error: `Discord webhook failed: ${res.status} ${errText}` },
//         { status: 502 }
//       );
//     }

//     return NextResponse.json({ ok: true });
//   } catch (e: unknown) {
//     const msg = e instanceof Error ? e.message : "Unknown error";
//     return NextResponse.json({ ok: false, error: msg }, { status: 500 });
//   }
// }
