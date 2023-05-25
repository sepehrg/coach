export interface IdoState {
  message: string;
  mimic: Mimic;
  name: string;
  position: Position;
  animation: AnimationEnum;
  audio?: string;
  background_state: Background;
  actions?: Action[];
}

export interface IdoAction {
  id: string;
  position: string;
  intro: string;
  outro: string;
  type: string;
  messages: IdoMessage[];
  time?: Date;
}

export interface IdoMessage {
  order: number;
  body: string;
}

export interface IdoActionRequest {
  type?: IdoActionTypes;
  page?: string;
  subjectId?: string;
}

export enum Position {
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  CENTER_LEFT = 'CENTER_LEFT',
  CENTER_CENTER = 'CENTER_CENTER',
}

export enum Background {
  TRANSPARENT = 'TRANSPARENT',
  DARKENED = 'DARKEND',
}

export enum AnimationEnum {
  SLIDE_BOTTOM_LEFT = 'SLIDE_BOTTOM_LEFT',
  SLIDE_BOTTOM_RIGHT = 'SLIDE_BOTTOM_RIGHT',
  SLIDE_CENTER_LEFT = 'SLIDE_CENTER_LEFT',
  GROW_CENTER = 'GROW_CENTER',
  FADE_CENTER = 'FADE_CENTER',
}

export interface Action {
  label: string;
  action: string;
  value: string;
}

export enum Mimic {
  HAPPY = 'Happy',
  SAD = 'Sad',
  FRUSTRATED = 'Frustrated',
  WAVING = 'Waving',
  SLEEPING = 'Sleeping',
  NEUTRAL = 'Neutral',
  SMILE = 'Smile',
  DETERMINED = 'Determined',
  GEEK = 'Geek',
  YAWNING = 'Yawning',
  COOL = 'Cool',
  PROUD = 'Proud',
  CONFUSED = 'Confused',
  MINDBLOWN = 'Mindblown',
  LOVED = 'Loved',
  SILLY = 'Silly',
  WORKING = 'Working',
  DREAMING = 'Dreaming',
}

export enum IdoActionTypes {
  AFFIRMATION = 'AFFIRMATION',
  MOTIVATION = 'MOTIVATION',
  REMINDER = 'REMINDER',
  SUBJECT_ADVICE = 'SUBJECT_ADVICE',
  FOCUSTIME_TIP = 'FOCUSTIME_TIP',
  SLEEPING = 'SLEEPING',
  GREETING = 'GREETING',
  PERSONAL_INFORMATION = 'PERSONAL_INFORMATION',
  ASK_IDO = 'ASK_IDO',
  USER_STATS = 'USER_STATS',
  OFFER_HELP = 'OFFER_HELP',
  SEND_FACT = 'SEND_FACT',
}
