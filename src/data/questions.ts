import type { Question, QuestionId } from "./types";
const opts = (pairs: string[][]) =>
  pairs.map(([value, label, description]) => ({ value, label, description }));
export const questions: Record<QuestionId, Question> = {
  currentLength: {
    id: "currentLength",
    stage: "Your hair",
    title: "How long is your hair right now?",
    helpText: "Think about the length on top. A rough idea is all we need.",
    imageAssetId: "question-currentLength",
    options: opts([
      ["buzzed", "Buzzed", "Very close to the head"],
      ["short", "Short", "A little length on top"],
      ["medium", "Medium", "Enough to fall or sweep"],
      ["long", "Long", "Around the ears or longer"],
    ]),
  },
  texture: {
    id: "texture",
    stage: "Your hair",
    title: "Which looks most like your natural hair?",
    helpText: "Choose how it grows naturally, before styling.",
    imageAssetId: "question-texture",
    options: opts([
      ["straight", "Straight"],
      ["wavy", "Wavy"],
      ["curly", "Curly"],
      ["coily", "Coily"],
    ]),
  },
  preferredLength: {
    id: "preferredLength",
    stage: "Your style",
    title: "How long would you like your next haircut to be?",
    imageAssetId: "question-preferredLength",
    options: opts([
      ["veryShort", "Very short"],
      ["short", "Short"],
      ["medium", "Medium"],
      ["long", "Long"],
      ["notSure", "Not sure yet"],
    ]),
  },
  willingToGrow: {
    id: "willingToGrow",
    stage: "Your style",
    title: "That look needs longer hair. Would you be happy to grow it out?",
    helpText: "We can suggest a look to work toward, or a cut you can get now.",
    imageAssetId: "question-willingToGrow",
    options: opts([
      ["yes", "Yes, I can wait"],
      ["no", "No, a cut for now"],
      ["notSure", "Not sure yet"],
    ]),
  },
  stylingEffort: {
    id: "stylingEffort",
    stage: "Your routine",
    title: "How much time do you want to spend on your hair?",
    imageAssetId: "question-stylingEffort",
    options: opts([
      ["none", "Wash and go", "Keep it easy"],
      ["aLittle", "A minute or two", "A little styling is fine"],
      ["happyToStyle", "I don’t mind styling it", "Happy to spend some time"],
    ]),
  },
  overallLook: {
    id: "overallLook",
    stage: "Your style",
    title: "Which sounds most like your style?",
    imageAssetId: "question-overallLook",
    options: opts([
      ["neatClassic", "Neat and classic"],
      ["relaxedTextured", "Relaxed and textured"],
      ["bold", "Something bold"],
      ["notSure", "Not sure yet"],
    ]),
  },
  sidesPreference: {
    id: "sidesPreference",
    stage: "The details",
    title: "What do you like on the sides?",
    imageAssetId: "question-sidesPreference",
    options: opts([
      [
        "naturalFuller",
        "Natural and fuller",
        "Mostly scissors, with a soft outline",
      ],
      ["tapered", "Gently tapered", "Gradually shorter near the edges"],
      ["fadedShort", "Faded and short", "Close-clipped sides blending upward"],
      ["notSure", "Not sure yet"],
    ]),
  },
  frontPreference: {
    id: "frontPreference",
    stage: "The details",
    title: "What about the hair at the front?",
    imageAssetId: "question-frontPreference",
    options: opts([
      ["forwardFringe", "A fringe coming forward"],
      ["upOrBack", "Up or brushed back"],
      ["parted", "A side or middle part"],
      ["notSure", "Not sure yet"],
    ]),
  },
};
