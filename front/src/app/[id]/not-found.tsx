import Link from "next/link";

export default function NotFoundMentor() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-3xl border border-teal-500/70 bg-white p-10 text-center shadow-sm">

        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-50 text-4xl">
            👨‍🏫
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold text-zinc-900">
          존재하지 않는 멘토입니다
        </h1>

        <p className="mb-8 text-xl leading-relaxed text-zinc-500">
          입력하신 멘토 페이지를 찾을 수 없습니다.
          <br />Í
          미용 진로 상담이 필요하시다면
          <br />
          전문 상담을 통해 안내받아보세요.
        </p>

        <Link
          href="/"
          className="flex h-14 w-full items-center justify-center rounded-xl bg-teal-600 text-sm font-bold text-white transition hover:bg-teal-700"
        >
          상담 페이지로 이동하기
        </Link>

      </div>
    </div>
  );
}