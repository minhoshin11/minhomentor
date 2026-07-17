// src/app/api/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";

// 1. 기존 카카오 토큰 발급용 GET (유지)
export async function GET(request: NextRequest) {
  // ... 기존 코드 ...
}

// 2. 문의 폼 제출용 POST (추가)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tab , name, phone, message, branchLabels, courseLabels } = body;

    // 디스코드 웹훅 URL 확인
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json({ error: "서버 설정 오류" }, { status: 500 });
    }

    // 디스코드 전송
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `🔔 **새로운 문의 접수**`,
        embeds: [{
          fields: [
            { name: "문의종류", value: tab, inline: true },
            { name: "이름", value: name, inline: true },
            { name: "연락처", value: phone, inline: true },
            { name: "지점", value: branchLabels.join(", ") },
            { name: "과정", value: courseLabels.join(", ") },
            { name: "문의", value: message || "없음" },
          ]
        }]
      }),
    });

    if (!response.ok) throw new Error("디스코드 전송 실패");

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "전송 실패" }, { status: 500 });
  }
}