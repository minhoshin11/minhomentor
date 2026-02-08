import { NextResponse } from "next/server";

export async function GET() {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({
      ok: false,
      error: "DISCORD_WEBHOOK_URL 없음",
    });
  }

  const message = {
    content: "📩 테스트 알림입니다. (폼 연동 전 테스트)",
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!res.ok) {
    return NextResponse.json({
      ok: false,
      error: "디스코드 전송 실패",
    });
  }

  return NextResponse.json({ ok: true });
}
