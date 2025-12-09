export interface WishMessage {
  language: string;
  message: string;
  transliteration?: string; // Optional pronunciation guide
}

export enum AppState {
  INTRO = 'INTRO',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED',
}
