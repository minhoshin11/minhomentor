// src/lib/kakaoToken.ts
type KakaoTokenResponse = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  refresh_token_expires_in?: number;
  scope?: string;
};

const KAKAO_TOKEN_URL = "https://kauth.kakao.com/oauth/token";

export async function getAccessTokenFromRefreshToken() {
  const restKey = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const refreshToken = process.env.NEXT_PUBLIC_KAKAO_REFRESH_TOKEN;

  if (!restKey) throw new Error("KAKAO_REST_API_KEY is missing");
  if (!refreshToken) throw new Error("KAKAO_REFRESH_TOKEN is missing");

  const body = new URLSearchParams();
  body.set("grant_type", "refresh_token");
  body.set("client_id", restKey);
  body.set("refresh_token", refreshToken);

  const res = await fetch(KAKAO_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
    cache: "no-store",
  });

  const text = await res.text();

  if (!res.ok) {
    // 카카오 응답을 그대로 던져서 디버깅 쉽게
    throw new Error(`Kakao token error (${res.status}): ${text}`);
  }

  const data = JSON.parse(text) as KakaoTokenResponse;

  // refresh_token은 응답에 "가끔"만 내려옵니다(갱신될 때)
  // 지금은 .env를 자동 업데이트 못 하니, 새로 내려오면 note만 남김
  if (data.refresh_token) {
    console.warn(
      "Kakao returned new refresh_token. Update .env.local manually:",
      data.refresh_token
    );
  }

  return data.access_token;
}
