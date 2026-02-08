import { NextRequest, NextResponse } from "next/server";

// 1. 카카오 인증/인가 코드 처리용 (GET)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "code 없음" }, { status: 400 });
  }

  const res = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.KAKAO_REST_API_KEY || "",
      redirect_uri: process.env.KAKAO_REDIRECT_URI || "",
      code,
    }),
  });

  const data = await res.json();

  return NextResponse.json({
    message: "토큰 발급 완료",
    refresh_token: data.refresh_token,
    scope: data.scope,
  });
}


// 2. 폼 데이터 제출 처리용 (POST) - RecommendForm에서 쏘는 것
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // console.log("1. 폼 데이터 수신:", body);

    // 환경변수 로드
    const client_id = process.env.KAKAO_REST_API_KEY;
    const refresh_token = process.env.KAKAO_REFRESH_TOKEN;

    if (!refresh_token) {
      return NextResponse.json({ error: "env에 리프레시 토큰이 없습니다." }, { status: 400 });
    }

    // 2. Refresh Token으로 새로운 Access Token 발급받기
const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    grant_type: "refresh_token",
    client_id: process.env.KAKAO_REST_API_KEY || "",
    refresh_token: process.env.KAKAO_REFRESH_TOKEN || "",
  }).toString(), // ✅ 반드시 .toString()이 붙어야 합니다!
});

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      // console.error("토큰 갱신 실패:", tokenData);
      return NextResponse.json({ error: "토큰 갱신 실패" }, { status: 401 });
    }

    // 3. 나에게 메시지 보내기 API 호출 (카카오)
    const messageRes = await fetch("https://kapi.kakao.com/v2/api/talk/memo/default/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        template_object: JSON.stringify({
          object_type: "text",
          text: `-----------🔔 \n[새로운 상담 접수]\n\n이름: ${body.name}\n연락처: ${body.phone}\n지점: ${body.branchLabels}\n과목: ${body.courseLabels}\n메시지: ${body.message || "없음"}`,
          link: {
            web_url: "https://docs.google.com/spreadsheets/d/1nn_vtlGXqVEjJWCe7kw1DmzmMeQcNHrG7pzcKLfKBMQ/edit?gid=1117083148#gid=1117083148",
            mobile_web_url: "https://docs.google.com/spreadsheets/d/1nn_vtlGXqVEjJWCe7kw1DmzmMeQcNHrG7pzcKLfKBMQ/edit?gid=1117083148#gid=1117083148",
          },
          button_title: "PC에서 확인해주세요.",
        }),
      }),
    });


    const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (discordWebhookUrl) {
      try {
        const discordText = [
          "📩 새 상담 접수",
          body.name ? `- 이름: ${body.name}` : null,
          body.phone ? `- 연락처: ${body.phone}` : null,
          body.branchLabels ? `- 지점: ${body.branchLabels}` : null,
          body.courseLabels ? `- 과목: ${body.courseLabels}` : null,
          body.message ? `- 메시지: ${body.message}` : "- 메시지: 없음",
          `- 시간: ${new Date().toLocaleString("ko-KR", {
            timeZone: "Asia/Seoul",
          })}`,
        ]
          .filter(Boolean)
          .join("\n");

        await fetch(discordWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: discordText }),
        });
      } catch {
        // 디스코드 실패는 폼 제출 자체를 실패로 만들지 않게 "무시" 처리
      }
    }

    
    // console.log("4. 카톡 전송 결과:", messageData);

    return NextResponse.json({ ok: true, message: "카톡 알림 발송 완료" });
  } catch (err) {
    // console.error("서버 에러:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
