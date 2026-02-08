// section02 CardType
export type SectionTwoCardProps = {
  id : string;
  imageSrc: string;
  title: string;
  subtitle: string;
  description: string;
};

// benefitData.ts
export type BenefitItem = {
  id: string;
  number: string; // "01"
  title: string;
  subtitle?: string;
  iconSrc: string; // public 경로
  iconAlt: string;
};
