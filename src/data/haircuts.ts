import type { Haircut } from "./types";
export const haircuts: Haircut[] = [
  {
    id: "buzz-cut",
    name: "Buzz Cut",
    family: "close",
    description: "Even, close, and ready to go.",
    imageAssetId: "buzz-cut",
    minCurrentLength: "buzzed",
    resultLength: "veryShort",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a buzz cut. Keep a uniform, very close length over the top and sides with a clean, soft hairline.",
    barberByTexture: {},
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 0,
  },
  {
    id: "butch-cut",
    name: "Butch Cut",
    family: "close",
    description: "A little more hair. Just as easy.",
    imageAssetId: "butch-cut",
    minCurrentLength: "buzzed",
    resultLength: "veryShort",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a butch cut. Leave a slightly fuller, uniform bristled length across the top and sides, longer than a close buzz.",
    barberByTexture: {},
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 1,
  },
  {
    id: "crew-cut",
    name: "Crew Cut",
    family: "crew",
    description: "Short sides with a little height in front.",
    imageAssetId: "crew-cut",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a crew cut. Keep the top short, graduating from a slightly longer front to a shorter crown, with blended sides.",
    barberByTexture: {},
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 2,
  },
  {
    id: "ivy-league",
    name: "Ivy League",
    family: "part",
    description: "A neat crop with room for a side part.",
    imageAssetId: "ivy-league",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["parted"],
    lookTags: ["neatClassic"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like an ivy league. Leave the front long enough for a soft side part, graduating shorter toward the crown and blending the sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 3,
  },
  {
    id: "high-and-tight",
    name: "High and Tight",
    family: "military",
    description: "Very close sides. A compact top.",
    imageAssetId: "high-and-tight",
    minCurrentLength: "buzzed",
    resultLength: "veryShort",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic", "bold"],
    defaultSides: "fadedShort",
    barberBase:
      "I'd like a high and tight. Keep a small, short panel on top, with a high, close blend around the back and sides.",
    barberByTexture: {},
    barberBySides: {
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 4,
  },
  {
    id: "caesar-cut",
    name: "Caesar Cut",
    family: "blunt",
    description: "A short, straight-across fringe.",
    imageAssetId: "caesar-cut",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["forwardFringe"],
    lookTags: ["neatClassic"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a caesar cut. Keep the top short and forward with a compact, blunt horizontal fringe and evenly blended sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 5,
  },
  {
    id: "french-crop",
    name: "French Crop",
    family: "blunt",
    description: "A defined fringe and tidy sides.",
    imageAssetId: "french-crop",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["forwardFringe"],
    lookTags: ["neatClassic", "relaxedTextured"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a french crop. Leave a short, defined forward fringe with a fuller top and a clear contrast against the blended sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 6,
  },
  {
    id: "textured-crop",
    name: "Textured Crop",
    family: "texture",
    description: "Choppy on top. Easygoing all over.",
    imageAssetId: "textured-crop",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller", "tapered", "fadedShort"],
    frontOptions: ["forwardFringe"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a textured crop. Create a short, choppy top with a broken forward fringe, retaining natural movement rather than a blunt edge.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 7,
  },
  {
    id: "short-spiky-cut",
    name: "Short Spiky Cut",
    family: "spikes",
    description: "Short, separated points with lift.",
    imageAssetId: "short-spiky-cut",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a short spiky cut. Keep the top short with separated, point-cut pieces that can be lifted into small spikes, with blended sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 8,
  },
  {
    id: "classic-side-part",
    name: "Classic Side Part",
    family: "part",
    description: "A timeless part with a neat outline.",
    imageAssetId: "classic-side-part",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["parted"],
    lookTags: ["neatClassic"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a classic side part. Leave enough length on top for a defined side part and a gentle sweep, with softly graduated sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 9,
  },
  {
    id: "comb-over",
    name: "Comb Over",
    family: "sweep",
    description: "A longer sweep across the top.",
    imageAssetId: "comb-over",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "happyToStyle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["parted"],
    lookTags: ["neatClassic"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a comb over. Keep a longer top swept across from a side part, blending the sides without exposing an exaggerated hard part.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 10,
  },
  {
    id: "quiff",
    name: "Quiff",
    family: "lift",
    description: "A lifted front with natural movement.",
    imageAssetId: "quiff",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "happyToStyle",
    sideOptions: ["naturalFuller", "tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic", "bold"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a quiff. Leave the front longer for an upward, backward lift, with a shorter crown and blended sides; retain movement.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 11,
  },
  {
    id: "pompadour",
    name: "Pompadour",
    family: "lift",
    description: "A tall, rounded sweep at the front.",
    imageAssetId: "pompadour",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "notRecommended",
    },
    stylingEffort: "happyToStyle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic", "bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a pompadour. Build a full rounded front that sweeps back into a shorter crown, with tidy blended sides and deliberate height.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 12,
  },
  {
    id: "slick-back",
    name: "Slick Back",
    family: "back",
    description: "Longer hair brushed back cleanly.",
    imageAssetId: "slick-back",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "happyToStyle",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a slick back. Retain a longer top that brushes back from the forehead, with graduated sides and a controlled finish.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 13,
  },
  {
    id: "undercut",
    name: "Undercut",
    family: "disconnect",
    description: "Long on top, clearly short underneath.",
    imageAssetId: "undercut",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "aLittle",
    sideOptions: ["fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["bold"],
    defaultSides: "fadedShort",
    barberBase:
      "I'd like an undercut. Keep length on top with a deliberate disconnected edge above closely clipped sides; do not blend away the contrast.",
    barberByTexture: {},
    barberBySides: {
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 14,
  },
  {
    id: "faux-hawk",
    name: "Faux Hawk",
    family: "ridge",
    description: "A soft central ridge without shaved strips.",
    imageAssetId: "faux-hawk",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "aLittle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a faux hawk. Leave a longer central ridge on top with shorter blended sides, keeping the ridge soft and wearable.",
    barberByTexture: {},
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 15,
  },
  {
    id: "mohawk",
    name: "Mohawk",
    family: "ridge",
    description: "A bold strip from front to back.",
    imageAssetId: "mohawk",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "happyToStyle",
    sideOptions: ["fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["bold"],
    defaultSides: "fadedShort",
    barberBase:
      "I'd like a mohawk. Keep a distinct strip from forehead through the crown to the nape, with very close sides; agree the strip width first.",
    barberByTexture: {},
    barberBySides: {
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 16,
  },
  {
    id: "textured-fringe",
    name: "Textured Fringe",
    family: "fringe",
    description: "A longer, broken-up fringe.",
    imageAssetId: "textured-fringe",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["forwardFringe"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a textured fringe. Leave a longer forward fringe with broken, textured ends, a layered top, and softly blended sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 17,
  },
  {
    id: "side-swept-fringe",
    name: "Side-Swept Fringe",
    family: "sweep",
    description: "A soft fringe swept to one side.",
    imageAssetId: "side-swept-fringe",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["parted", "forwardFringe"],
    lookTags: ["neatClassic", "relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a side-swept fringe. Keep the front longer to sweep diagonally across the forehead, with a layered top and soft sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 18,
  },
  {
    id: "curtains",
    name: "Curtains (Middle Part)",
    family: "curtains",
    description: "A middle part that frames the face.",
    imageAssetId: "curtains",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller"],
    frontOptions: ["parted"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like the curtains (middle part) style. Create a middle part with a longer split fringe framing both sides of the face and softly layered scissor-cut sides.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 19,
  },
  {
    id: "mop-top",
    name: "Mop Top",
    family: "rounded",
    description: "A full, soft shape with a longer fringe.",
    imageAssetId: "mop-top",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller"],
    frontOptions: ["forwardFringe"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a mop top. Keep a full rounded scissor-cut shape, a longer soft fringe, and gentle layers around the ears and nape.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 20,
  },
  {
    id: "bro-flow",
    name: "Bro Flow",
    family: "flow",
    description: "Swept back with length around the ears.",
    imageAssetId: "bro-flow",
    minCurrentLength: "long",
    resultLength: "long",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller"],
    frontOptions: ["upOrBack"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a bro flow. Keep longer layers that flow back around the ears, retaining length at the nape and a soft scissor-cut outline.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 21,
  },
  {
    id: "shag",
    name: "Shag",
    family: "layers",
    description: "Loose layers and a soft, textured fringe.",
    imageAssetId: "shag",
    minCurrentLength: "long",
    resultLength: "long",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "adaptable",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller"],
    frontOptions: ["forwardFringe"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a shag. Create connected, choppy layers through the crown and sides, with a soft fringe and wispy length at the nape.",
    barberByTexture: {
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 22,
  },
  {
    id: "wolf-cut",
    name: "Wolf Cut",
    family: "layers",
    description: "A full crown with longer, shaggy ends.",
    imageAssetId: "wolf-cut",
    minCurrentLength: "long",
    resultLength: "long",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller"],
    frontOptions: ["forwardFringe"],
    lookTags: ["relaxedTextured", "bold"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a wolf cut. Create a shorter, full layered crown that drops into longer wispy back layers, with a shaggy face-framing fringe.",
    barberByTexture: {
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 23,
  },
  {
    id: "modern-mullet",
    name: "Modern Mullet",
    family: "mullet",
    description: "Shorter at the sides, longer at the back.",
    imageAssetId: "modern-mullet",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "aLittle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["forwardFringe", "upOrBack"],
    lookTags: ["bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a modern mullet. Keep a clear longer back and shorter sides, connecting a textured top into the length at the nape.",
    barberByTexture: {},
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 24,
  },
  {
    id: "bowl-cut",
    name: "Bowl Cut",
    family: "rounded",
    description: "A strong, rounded fringe and outline.",
    imageAssetId: "bowl-cut",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "adaptable",
      coily: "adaptable",
    },
    stylingEffort: "aLittle",
    sideOptions: ["naturalFuller"],
    frontOptions: ["forwardFringe"],
    lookTags: ["bold"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a bowl cut. Create an intentional rounded perimeter joining the fringe to the sides, with a tidy underlayer and a distinct bowl silhouette.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 25,
  },
  {
    id: "surfer-hair",
    name: "Surfer Hair",
    family: "flow",
    description: "Long, loose layers with natural movement.",
    imageAssetId: "surfer-hair",
    minCurrentLength: "long",
    resultLength: "long",
    textureFit: {
      straight: "adaptable",
      wavy: "ideal",
      curly: "ideal",
      coily: "adaptable",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller"],
    frontOptions: ["parted"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like surfer hair. Keep long, loose layers with soft face framing and an easy scissor-cut outline; work with natural movement.",
    barberByTexture: {
      straight:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      coily:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 26,
  },
  {
    id: "layered-scissor-cut",
    name: "Layered Scissor Cut",
    family: "scissor",
    description: "Soft layers, with no close-clipped sides.",
    imageAssetId: "layered-scissor-cut",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "ideal",
      wavy: "ideal",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller"],
    frontOptions: ["parted", "forwardFringe"],
    lookTags: ["neatClassic", "relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a layered scissor cut. Use scissors throughout to create connected layers on top and sides, with a soft outline around the ears and nape.",
    barberByTexture: {},
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 27,
  },
  {
    id: "curly-crop",
    name: "Curly Crop",
    family: "curlCrop",
    description: "Natural curls in a compact shape.",
    imageAssetId: "curly-crop",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["forwardFringe"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a curly crop. Shape a compact curly top with a soft forward edge and shorter blended sides; preserve the natural curl pattern.",
    barberByTexture: {},
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 28,
  },
  {
    id: "curly-high-top",
    name: "Curly High Top",
    family: "highTop",
    description: "A tall curl shape with short sides.",
    imageAssetId: "curly-high-top",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "aLittle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a curly high top. Retain a tall, defined curly top with a squared or softly rounded outline and closely blended sides.",
    barberByTexture: {},
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 29,
  },
  {
    id: "curly-top-with-taper",
    name: "Curly Top with Taper",
    family: "curlTaper",
    description: "Full curls on top, tidy at the edges.",
    imageAssetId: "curly-top-with-taper",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["tapered"],
    frontOptions: ["forwardFringe", "upOrBack"],
    lookTags: ["relaxedTextured"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a curly top with taper. Keep a rounded, full curly top and gently taper only near the temples and nape, preserving weight above the ears.",
    barberByTexture: {},
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 30,
  },
  {
    id: "short-afro",
    name: "Short Afro",
    family: "afroShort",
    description: "A compact, even natural shape.",
    imageAssetId: "short-afro",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "adaptable",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller", "tapered"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic", "relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a short afro. Shape a short, even natural Afro with a soft rounded outline and balanced sides; retain the natural coils.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 31,
  },
  {
    id: "rounded-afro",
    name: "Rounded Afro",
    family: "afroRound",
    description: "Full, rounded natural volume.",
    imageAssetId: "rounded-afro",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "adaptable",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["naturalFuller"],
    frontOptions: ["upOrBack"],
    lookTags: ["relaxedTextured"],
    defaultSides: "naturalFuller",
    barberBase:
      "I'd like a rounded afro. Shape a full, balanced rounded Afro with volume across the top and sides, trimming the outline without flattening the coils.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      naturalFuller: "Keep the sides fuller with a soft scissor-cut outline.",
    },
    sortPriority: 32,
  },
  {
    id: "tapered-afro",
    name: "Tapered Afro",
    family: "afroTaper",
    description: "Natural volume with a tapered outline.",
    imageAssetId: "tapered-afro",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "adaptable",
      coily: "ideal",
    },
    stylingEffort: "none",
    sideOptions: ["tapered"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic", "relaxedTextured"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a tapered afro. Keep natural Afro volume through the crown, tapering gently toward the temples and nape while preserving the rounded top.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 33,
  },
  {
    id: "flat-top",
    name: "Flat Top",
    family: "highTop",
    description: "A level top with a structured shape.",
    imageAssetId: "flat-top",
    minCurrentLength: "short",
    resultLength: "short",
    textureFit: {
      straight: "adaptable",
      wavy: "adaptable",
      curly: "notRecommended",
      coily: "ideal",
    },
    stylingEffort: "aLittle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic", "bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a flat top. Create an upright top trimmed into a level plane with defined corners and shorter blended sides.",
    barberByTexture: {
      straight:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
      wavy: "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 34,
  },
  {
    id: "frohawk",
    name: "Frohawk",
    family: "ridgeNatural",
    description: "A central strip of natural curls or coils.",
    imageAssetId: "frohawk",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "ideal",
      coily: "ideal",
    },
    stylingEffort: "aLittle",
    sideOptions: ["tapered", "fadedShort"],
    frontOptions: ["upOrBack"],
    lookTags: ["bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a frohawk. Retain a raised strip of natural curls or coils from front to nape, shaping the sides close to emphasize the central silhouette.",
    barberByTexture: {},
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
      fadedShort:
        "Blend the close-clipped sides upward, keeping the top shape described.",
    },
    sortPriority: 35,
  },
  {
    id: "360-waves",
    name: "360 Waves",
    family: "waves",
    description: "A close cut styled into a wave pattern.",
    imageAssetId: "360-waves",
    minCurrentLength: "buzzed",
    resultLength: "veryShort",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "adaptable",
      coily: "ideal",
    },
    stylingEffort: "happyToStyle",
    sideOptions: ["tapered"],
    frontOptions: ["upOrBack"],
    lookTags: ["neatClassic"],
    defaultSides: "tapered",
    barberBase:
      "I'd like 360 waves. Keep a short, even top that retains enough natural curl to brush into waves, with a gentle edge taper. The wave pattern needs ongoing brushing and styling; the cut alone does not create it.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 36,
  },
  {
    id: "twist-top-with-taper",
    name: "Twist Top with Taper",
    family: "twists",
    description: "Styled twists above a soft taper.",
    imageAssetId: "twist-top-with-taper",
    minCurrentLength: "medium",
    resultLength: "medium",
    textureFit: {
      straight: "notRecommended",
      wavy: "notRecommended",
      curly: "adaptable",
      coily: "ideal",
    },
    stylingEffort: "happyToStyle",
    sideOptions: ["tapered"],
    frontOptions: ["upOrBack"],
    lookTags: ["relaxedTextured", "bold"],
    defaultSides: "tapered",
    barberBase:
      "I'd like a twist top with taper. Keep enough natural length on top for sectioned twists and gently taper the temples and nape. Twists are a separate styling service, not a texture created by cutting; agree the styling with the barber.",
    barberByTexture: {
      curly:
        "Keep my natural texture visible; adapt the outline without straightening or changing the curl pattern.",
    },
    barberBySides: {
      tapered: "Use a gradual taper at the edges, keeping the blend soft.",
    },
    sortPriority: 37,
  },
];
