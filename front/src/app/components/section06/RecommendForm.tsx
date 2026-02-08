"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { BRANCH_OPTIONS, COURSE_OPTIONS } from "./options";

type TabType = "tuition" | "kakao";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function ToggleChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "rounded-full border px-5 py-2 text-sm font-semibold transition",
        selected
          ? "border-teal-600 bg-teal-600 text-white shadow-sm"
          : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-300"
      )}
    >
      {label}
    </button>
  );
}

export default function RecommendForm() {
  const [tab, setTab] = useState<TabType>("tuition");

  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // ✅ string 유지 (앞자리 0 보존)

  const [consent, setConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMsg, setResultMsg] = useState<string | null>(null);

  // ✅ 숫자만 추출
  const phoneDigits = useMemo(() => phone.replace(/\D/g, ""), [phone]);

  // ✅ 11자리만 허용(한국 휴대폰 기준)
  const phoneValid = phoneDigits.length === 11;

  const canSubmit =
    !isSubmitting &&
    consent &&
    name.trim().length > 0 &&
    phoneValid &&
    selectedBranches.length > 0 &&
    selectedCourses.length > 0;

  const toggleMulti = (
    list: string[],
    setList: (v: string[]) => void,
    id: string
  ) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const branchLabels = useMemo(() => {
    const map = new Map(BRANCH_OPTIONS.map((x) => [x.id, x.label]));
    return selectedBranches.map((id) => map.get(id) ?? id);
  }, [selectedBranches]);

  const courseLabels = useMemo(() => {
    const map = new Map(COURSE_OPTIONS.map((x) => [x.id, x.label]));
    return selectedCourses.map((id) => map.get(id) ?? id);
  }, [selectedCourses]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setResultMsg(null);

    try {
      const payload = {
        createdAt: new Date().toISOString(),
        tab, // ✅ "수강료조회인지/카톡상담인지" 서버에서 확인 가능
        branchLabels,
        courseLabels,
        message,
        name: name.trim(),
        phone: phoneDigits, // ✅ 숫자 11자리 string
      };

      // 🚀 1. 서버로 보내기 전 데이터 최종 확인
      // console.log("전송할 데이터(Payload):", payload);

      const res = await fetch("/api/oauth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json().catch(() => ({}));

  //     console.log(res.body)
  //     console.log("REST_KEY:", process.env.KAKAO_REST_API_KEY);
  // console.log("REDIRECT_URI:", process.env.KAKAO_REDIRECT_URI);
  // console.log("FULL ENV:", process.env)
      
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error ?? "제출에 실패했습니다.");
        
      }

      setResultMsg("접수가 완료되었습니다. 곧 연락드리겠습니다.");
    } catch (err: any) {
      setResultMsg(err?.message ?? "오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
      
    }
  };

  return (
    <section className="w-full bg-white py-16">
      {/* ✅ 이 wrapper가 폭을 관리합니다 */}
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold leading-tight text-zinc-900 md:text-4xl">
            수강료 조회하고
            <br />
            100% 반환혜택 모두 받아가세요!
          </h2>
          <p className="mt-3 text-sm text-zinc-500 md:text-base">
            상담을 통해 현재 상황에 맞는 맞춤 로드맵을 제안해드립니다
          </p>
        </div>

        {/* 탭 */}
        <div className="mb-10 grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setTab("tuition")}
            className={cx(
              "h-14 rounded-2xl text-base font-extrabold transition",
              tab === "tuition"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            )}
          >
            수강료조회
          </button>

          <button
            type="button"
            onClick={() => setTab("kakao")}
            className={cx(
              "h-14 rounded-2xl text-base font-extrabold transition",
              tab === "kakao"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            )}
          >
            카톡상담
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-10">
          {/* 지점 */}
          <div>
            <p className="mb-3 text-base font-extrabold text-zinc-900">
              가까운 지점을 선택해 주세요.
            </p>
            <div className="flex flex-wrap gap-3">
              {BRANCH_OPTIONS.map((b) => (
                <ToggleChip
                  key={b.id}
                  label={b.label}
                  selected={selectedBranches.includes(b.id)}
                  onClick={() =>
                    toggleMulti(selectedBranches, setSelectedBranches, b.id)
                  }
                />
              ))}
            </div>
          </div>

          {/* 과정 */}
          <div>
            <div className="mb-3 flex items-baseline gap-2">
              <p className="text-base font-extrabold text-zinc-900">
                희망과정을 선택해 주세요.
              </p>
              <span className="text-sm font-semibold text-zinc-500">
                (복수선택가능)
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {COURSE_OPTIONS.map((c) => (
                <ToggleChip
                  key={c.id}
                  label={c.label}
                  selected={selectedCourses.includes(c.id)}
                  onClick={() =>
                    toggleMulti(selectedCourses, setSelectedCourses, c.id)
                  }
                />
              ))}
            </div>
          </div>

          {/* 문의 */}
          <div>
            <p className="mb-3 text-base font-extrabold text-zinc-900">
              배우고 싶은 과정이나 궁금한 점을 알려주세요.
            </p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="예시) 미용관련 대학교를 들어가고 싶어요!"
              className="h-40 w-full resize-none rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-600"
            />
          </div>

          {/* 이름/연락처 */}
          <div>
            <p className="mb-3 text-base font-extrabold text-zinc-900">
              혜택받으실 분의 이름과 연락처를 입력해 주세요.
            </p>

            <div className="space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력해주세요."
                className="h-14 w-full rounded-2xl border border-zinc-200 bg-white px-5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-teal-600"
              />

              <input
                value={phoneDigits}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
                  setPhone(digits);
                }}
                inputMode="numeric"
                maxLength={11}
                placeholder="연락처를 하이픈(-) 없이 숫자만 입력해주세요. (11자리)"
                className={cx(
                  "h-14 w-full rounded-2xl border bg-white px-5 text-sm outline-none placeholder:text-zinc-400",
                  phoneDigits.length === 0 || phoneValid
                    ? "border-zinc-200 focus:border-teal-600"
                    : "border-red-400 focus:border-red-500"
                )}
              />

              {/* ✅ 안내 문구 */}
              {!phoneValid && phoneDigits.length > 0 ? (
                <p className="text-sm font-semibold text-red-500">
                  휴대폰 번호 11자리를 입력해주세요.
                </p>
              ) : null}
            </div>
          </div>

          {/* 동의 */}
          <label className="flex items-center justify-center gap-2 text-sm text-zinc-600">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-5 w-5 accent-teal-600"
            />
            개인정보 수집·이용에 동의합니다. (필수)
          </label>

          {/* CTA */}
          <div className="space-y-4">
            <button
              type="submit"
              disabled={!canSubmit}
              className={cx(
                "h-16 w-full rounded-2xl text-lg font-extrabold transition",
                canSubmit
                  ? "bg-teal-600 text-white shadow-md hover:bg-teal-700"
                  : "bg-teal-600/40 text-white/80 cursor-not-allowed"
              )}
            >
              {isSubmitting ? "전송 중..." : "수강료 조회하기"}
            </button>

            {resultMsg ? (
              <p className="text-center text-sm text-zinc-600">{resultMsg}</p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
