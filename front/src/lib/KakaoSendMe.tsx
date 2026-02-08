// src/lib/kakaoSendMe.ts

import type { Section06Payload } from "@/Types/FormType";
import { getAccessTokenFromRefreshToken } from "./KakaoToken";

const SEND_ME_URL = "https://kapi.kakao.com/v2/api/talk/memo/default/send";

function buildTextMessage(payload: Section06Payload) {
  const typeLabel = payload.tab === "kakao" ? "카톡상담" : "수강료조회";

  const lines = [
    "문의가 왔습니다.",
    `유형 : ${typeLabel}`,
    `이름 : ${payload.name ?? "-"}`,
    `폰 번호 : ${payload.phone ?? "-"}`,
    `관심분야 : ${(payload.courseLabels ?? []).join(", ") || "-"}`,
    `가까운 지역 : ${(payload.branchLabels ?? []).join(", ") || "-"}`,
    payload.message?.trim() ? `문의내용 : ${payload.message.trim()}` : "",
  ].filter(Boolean);

  return {
    object_type: "text",
    text: lines.join("\n"),
    link: {
      web_url: "https://allthat-beauty.com",
      mobile_web_url: "https://allthat-beauty.com",
    },
  };
}

export async function sendKakaoToMe(payload: Section06Payload) {
  const accessToken = await getAccessTokenFromRefreshToken();

  const template_object = buildTextMessage(payload);

  // 카카오는 form-urlencoded 로 template_object를 보내야 합니다.
  const body = new URLSearchParams();
  body.set("template_object", JSON.stringify(template_object));

  const res = await fetch(SEND_ME_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
    cache: "no-store",
  });

  const text = await res.text();

  // 🔥 디버깅 로그 (연동 확인할 때 필수)
  console.log("Kakao send status:", res.status);
  console.log("Kakao send body:", text);

  if (!res.ok) {
    throw new Error(`Kakao send error (${res.status}): ${text}`);
  }

  // 성공이면 {"result_code":0} 형태가 보통 옴
  return text;
}
