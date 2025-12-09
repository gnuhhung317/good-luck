import { WishMessage } from './types';

export const PIANO_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3"; // "Empty Mind" - Lofi/Piano royalty free

export const BASE_WISH_VN = "Chúc em yêu ngày mai bảo vệ khóa luận thành công rực rỡ!";

// Fallback data in case API fails or is unavailable
export const FALLBACK_WISHES: WishMessage[] = [
  { language: "English", message: "Good luck with your thesis defense tomorrow, my love! You will shine brightly." },
  { language: "French", message: "Bonne chance pour ta soutenance de thèse demain, mon amour ! Tu vas briller." },
  { language: "Spanish", message: "¡Buena suerte con la defensa de tu tesis mañana, mi amor! Brillarás intensamente." },
  { language: "Japanese", message: "明日の卒論発表、頑張ってね、愛しい人！君なら絶対に輝けるよ。" },
  { language: "Korean", message: "내 사랑, 내일 논문 디펜스 잘 해! 넌 정말 멋지게 해낼 거야." },
  { language: "German", message: "Viel Glück bei deiner Verteidigung morgen, meine Liebe! Du wirst strahlen." },
  { language: "Italian", message: "In bocca al lupo per la discussione della tesi di domani, amore mio! Splenderai." },
  { language: "Russian", message: "Удачи на защите диплома завтра, любовь моя! Ты будешь блистать." },
  { language: "Chinese", message: "亲爱的，祝你明天论文答辩圆满成功！你一定会大放异彩。" },
  { language: "Thai", message: "ขอให้การสอบป้องกันวิทยานิพนธ์พรุ่งนี้ผ่านไปด้วยดีนะที่รัก เธอต้องทำได้ดีมากแน่ๆ" },
  { language: "Portuguese", message: "Boa sorte com a defesa da sua tese amanhã, meu amor! Você vai brilhar." },
  { language: "Hindi", message: "कल तुम्हारी थीसिस डिफेंस के लिए शुभकामनाएं, मेरे प्यार! तुम चमकोगी।" },
  { language: "Arabic", message: "حظاً سعيداً في مناقشة رسالتك غداً يا حبيبتي! سوف تتألقين." },
  { language: "Dutch", message: "Veel succes met je scriptieverdediging morgen, mijn liefste! Je zult stralen." },
  { language: "Swedish", message: "Lycka till med din uppsatsförsvar imorgon, min älskade! Du kommer att lysa." },
  { language: "Turkish", message: "Yarınki tez savunmanda bol şans, aşkım! Harika olacaksın." },
  { language: "Greek", message: "Καλή επιτυχία στην υπεράσπιση της διατριβής σου αύριο, αγάπη μου! Θα λάμψεις." },
  { language: "Polish", message: "Powodzenia na jutrzejszej obronie pracy dyplomowej, kochanie! Będziesz błyszczeć." },
  { language: "Indonesian", message: "Semoga sukses sidang skripsinya besok ya sayang! Kamu pasti bisa." },
];