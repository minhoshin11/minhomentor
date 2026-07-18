"use client";

import { useState } from "react";

interface PrivacyConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function PrivacyConsent({
  checked,
  onChange,
}: PrivacyConsentProps) {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-sm text-zinc-600">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="h-5 w-5 accent-teal-600"
          />

          <span>
            개인정보 수집·이용에 동의합니다. (필수)
          </span>
        </label>

        <button
          type="button"
          onClick={() => setShowPrivacy((prev) => !prev)}
          className="font-semibold text-teal-600 underline"
        >
          자세히 보기
        </button>
      </div>

     <div
  className={`
    grid transition-all duration-300 ease-in-out
    ${
      showPrivacy
        ? "grid-rows-[1fr] opacity-100"
        : "grid-rows-[0fr] opacity-0"
    }
  `}
>
  <div className="overflow-hidden">
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-6 text-zinc-700">
      <p className="mb-3 font-bold text-zinc-900">
        개인정보 수집·이용 안내
      </p>

      <div className="space-y-2">
        <p>
          <span className="font-semibold text-zinc-900">
            수집 항목:
          </span>{" "}
          이름, 연락처, 수강안내 관련 이력
        </p>

        <p>
          <span className="font-semibold text-zinc-900">
            이용 목적:
          </span>{" "}
          수강안내 제공, 관련 이력 관리 및 맞춤형 재안내를 통한 서비스 품질 개선
        </p>

        <p>
          <span className="font-semibold text-zinc-900">
            보유 기간:
          </span>{" "}
          수집일로부터 최대 3년간 보관 후 파기
        </p>

        <p>
          - 입력하신 정보가 사실과 다를 시에는 조회 서비스를 받으실 수 없습니다.
        </p>

        <p>
          - 기입하신 정보는 상담 목적 외에 다른 용도로 절대 사용되지 않습니다.
        </p>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}