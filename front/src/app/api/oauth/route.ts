// src/app/api/oauth/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      tab,
      name,
      phone,
      message,
      branchLabel,
      courseLabels,
      mentorName,
    } = body;

    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { error: "서버 설정 오류" },
        { status: 500 }
      );
    }
    
    //폰 하이푼(-) 추가
    const formattedPhone =
  phone && phone.length === 11
    ? phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
    : phone;

    // 시간
    const now = new Date().toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
    });

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [
          {
            title: "📩 신규 상담 문의",
            color: 5763719,

            fields: [
              {
                name: "👨‍🏫 담당멘토",
                value: mentorName || "미지정",
              },

              {
                name: "🕒 접수시간",
                value: now,
              },

              {
                name: "🙋 이름",
                value: name || "미입력",
                inline: true,
              },
              {
                name: "📞 연락처",
                value: formattedPhone || "미입력",
                inline: true,
              },

              {
                name: "🏢 희망지점",
                value: branchLabel || "미선택",
                inline: true,
              },

              {
                name: "💄 희망과정",
                value:
                  courseLabels?.length > 0
                    ? courseLabels.join(", ")
                    : "미선택",
                inline: true,
              },

              {
                name: "📋 문의유형",
                value: tab || "미선택",
              },

              {
                name: "📝 문의내용",
                value: message?.trim() || "없음",
              },
            ],

          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord Error:", errorText);

      throw new Error("디스코드 전송 실패");
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "전송 실패",
      },
      {
        status: 500,
      }
    );
  }
}