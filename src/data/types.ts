export type Length = "buzzed" | "short" | "medium" | "long";
export type Texture = "straight" | "wavy" | "curly" | "coily";
export type Effort = "none" | "aLittle" | "happyToStyle";
export type Sides = "naturalFuller" | "tapered" | "fadedShort";
export type Front = "forwardFringe" | "upOrBack" | "parted";
export type Look = "neatClassic" | "relaxedTextured" | "bold";
export interface QuizAnswers {
  currentLength?: Length;
  texture?: Texture;
  preferredLength?: "veryShort" | "short" | "medium" | "long" | "notSure";
  willingToGrow?: "yes" | "no" | "notSure";
  stylingEffort?: Effort;
  overallLook?: Look | "notSure";
  sidesPreference?: Sides | "notSure";
  frontPreference?: Front | "notSure";
}
export type QuestionId = keyof QuizAnswers;
export interface Question {
  id: QuestionId;
  stage: string;
  title: string;
  helpText?: string;
  imageAssetId: string;
  options: { value: string; label: string; description?: string }[];
}
export interface Haircut {
  id: string;
  name: string;
  family: string;
  description: string;
  imageAssetId: string;
  minCurrentLength: Length;
  resultLength: "veryShort" | "short" | "medium" | "long";
  textureFit: Record<Texture, "ideal" | "adaptable" | "notRecommended">;
  stylingEffort: Effort;
  sideOptions: Sides[];
  frontOptions: Front[];
  lookTags: Look[];
  defaultSides: Sides;
  barberBase: string;
  barberByTexture?: Partial<Record<Texture, string>>;
  barberBySides: Partial<Record<Sides, string>>;
  sortPriority: number;
}
