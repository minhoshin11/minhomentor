// src/lib/googleSheets.ts
export type Section06Payload = {
  createdAt: string;
  tab: "tuition" | "kakao";
  branchLabels: string[];
  courseLabels: string[];
  message: string;
  name: string;
  phone: string; // digits only
};


// src/lib/kakaoTalk.ts
export type KakaoTokenResponse = {
  access_token: string;
  token_type: string;
  refresh_token?: string;
  expires_in: number;
  scope?: string;
};

