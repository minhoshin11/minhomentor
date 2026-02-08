// src/app/oauth/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // URL에서 인가 코드(code) 꺼내기
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "인가 코드가 없습니다." }, { status: 400 });
  }

  try {
    // 카카오에 토큰 요청
    const response = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY!,
        redirect_uri: process.env.KAKAO_REDIRECT_URI!,
        code: code,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    console.log("카카오 응답 전체:", data); 
if (data.refresh_token) {
    console.log("리프레시 토큰 찾음!:", data.refresh_token);
} else {
    console.log("리프레시 토큰이 응답에 없습니다.");
}

    // 화면에 띄워진 데이터 중 'refresh_token'을 복사해서 .env에 넣으세요!
    return NextResponse.json({
      message: "성공! 아래 리프레시 토큰을 .env에 복사하세요.",
      refresh_token: data.refresh_token,
      full_response: data,
    });
  } catch (error) {
    return NextResponse.json({ error: "서버 에러 발생" }, { status: 500 });
  }
}