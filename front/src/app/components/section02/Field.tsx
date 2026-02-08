import { CardData } from './CardData'
import Card from './Card'
// 여기에 입력값 사진,제목,설명 이렇게 3개 필요함
export default function Field() {
  return (
    <section
      className="
    w-full
    bg-[url(/bg-field.jpg)]
    bg-cover
    bg-center
    bg-no-repeat
  "
    >
      {/* 어둡게 처리 (가독성용 오버레이) */}
      <div className="bg-black/80">
        <div className="flex gap-15 flex-col">
          
          {/* 후킹 멘트 */}
          <div className="flex flex-col justify-center items-center gap-10 mt-20 text-white text-center">
            <div className="text-4xl font-bold">
              손끝의 기술이 커리가 되는 순간
            </div>

            <div className="text-xl font-bold flex flex-col gap-4">
              <span>현장 실무 흐름을 반영한</span>
              <span>4개의 전문과정이 있습니다.</span>
            </div>
          </div>

          {/* 카드 섹션 */}
          <section className="w-full pb-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-4 max-w-6xl mx-auto">
              {CardData.map((item, index) => (
                <Card key={item.id ?? index} {...item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
