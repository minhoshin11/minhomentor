// src/components/section06/options.ts
export type ChipOption = {
  id: string;
  label: string;
};

export const BRANCH_OPTIONS: ChipOption[] = [
  { id: "gangnam", label: "강남" },
  { id: "sinchon", label: "신촌/홍대" },
  { id: "busan", label: "부산" },
  { id: "daegu", label: "대구" },
  { id: "incheon", label: "인천/부천" },
  { id: "daejeon", label: "대전" },
  { id: "suwon", label: "수원" },
  { id: "gwangju", label: "광주" },
  { id: "ilsan", label: "일산" },
  { id: "nowon", label: "노원" },
  { id: "cheonan", label: "천안" },
];

export const COURSE_OPTIONS: ChipOption[] = [
  { id: "makeup", label: "메이크업" },
  { id: "hair", label: "헤어 (이용사)" },
  { id: "nail", label: "네일아트" },
  { id: "esthetic", label: "에스테틱" },
];
