export type Milestone = {
  [key: string]: string[];
  "social/emotional": string[];
  "language/communication": string[];
  "Cognitive Milestones (learning, thinking, problem-solving)": string[];
  "Movement/Physical Development": string[];
};

export const milestones: Record<string, Milestone> = {
  "2 months": {
    "social/emotional": [
      "Calms down when spoken to or picked up",
      "Looks at your face",
      "Seems happy to see you when you walk up to her",
      "Smiles when you talk to or smile at her",
    ],
    "language/communication": [
      "Makes sounds other than crying",
      "Reacts to loud sounds",
    ],
    "Cognitive Milestones (learning, thinking, problem-solving)": [
      "Watches you as you move",
      "Looks at a toy for several seconds",
    ],
    "Movement/Physical Development": [
      "Holds head up when on tummy",
      "Moves both arms and both legs",
      "Opens hands briefly",
    ],
  },
  "4 months": {
    "social/emotional": [
      "Smiles on his own to get your attention",
      "Chuckles (not yet a full laugh) when you try to make her laugh",
      "Looks at you, moves, or makes sounds to get or keep your attention",
    ],
    "language/communication": [
      "Makes sounds like “oooo”, “aahh” (cooing)",
      "Makes sounds back when you talk to her",
      "Turns head towards the sound of your voice",
    ],
    "Cognitive Milestones (learning, thinking, problem-solving)": [
      "If hungry, opens mouth when he sees breast or bottle",
      "Looks at her hands with interest",
    ],
    "Movement/Physical Development": [
      "Holds head steady without support when you are holding her",
      "Holds a toy when you put it in his hand",
      "Uses his arm to swing at toys",
      "Brings hands to mouth",
      "Pushes up onto elbows/forearms when on tummy",
    ],
  },
  "6 months": {
    "social/emotional": [
      "Knows familiar people",
      "Likes to look at self in a mirror",
      "Laughs",
    ],
    "language/communication": [
      "Takes turns making sounds with you",
      "Blows “raspberries” (sticks tongue out and blows)",
      "Makes squealing noises",
    ],
    "Cognitive Milestones (learning, thinking, problem-solving)": [
      "Puts things in her mouth to explore them",
      "Reaches to grab a toy she wants",
      "Closes lips to show she doesn’t want more food",
    ],
    "Movement/Physical Development": [
      "Rolls from tummy to back",
      "Pushes up with straight arms when on tummy",
      "Leans on hands to support herself when sitting",
    ],
  },
  "9 months": {
    "social/emotional": [
      "Is shy, clingy, or fearful around strangers",
      "Shows several facial expressions, like happy, sad, angry, and surprised",
      "Looks when you call her name ",
      "Reacts when you leave (looks, reaches for you, or cries)",
      "Smiles or laughs when you play peek-a-boo",
    ],
    "language/communication": [
      'Makes a lot of different sounds like "mamamama" and "bababababa"',
      "Lifts arms up to be picked up)",
    ],
    "Cognitive Milestones (learning, thinking, problem-solving)": [
      "Looks for objects when dropped out of sight (like his spoon or toy)",
      "Bangs two things together",
    ],
    "Movement/Physical Development": [
      "Gets to a sitting position by herself",
      "Moves things from one hand to her other hand",
      "Uses fingers to “rake” food towards herself",
      "Sits without support",
    ],
  },
  "12 months": {
    "social/emotional": ["Plays games with you, like pat-a-cake"],
    "language/communication": [
      "Waves “bye-bye”",
      "Calls a parent “mama” or “dada” or another special name",
      "Understands “no” (pauses briefly or stops when you say it)",
    ],
    "Cognitive Milestones (learning, thinking, problem-solving)": [
      "Puts something in a container, like a block in a cup",
      "Looks for things he sees you hide, like a toy under a blanket",
    ],
    "Movement/Physical Development": [
      "Pulls up to stand",
      "Walks, holding on to furniture",
      "Drinks from a cup without a lid, as you hold it",
      "Picks things up between thumb and pointer finger, like small bits of food",
    ],
  },
  "15 months": {},
  "18 months": {},
  "24 months": {},
  "30 months": {},
  "36 months": {},
  "48 months": {},
  "60 months": {},
};
