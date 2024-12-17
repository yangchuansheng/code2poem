import { GameLevel, PoemData } from '@/types/game';

const CONFUSION_CHARS = {
  easy: [
    // 基础自然字符
    '天', '地', '山', '水', '风', '云', '日', '月', '星', '花', '草', '木', '鸟', '虫', '鱼',
    // 从诗句中选取的常用字符
    '春', '秋', '夜', '晓', '江', '湖', '雨', '雪', '梅', '柳',
    // 简单诗句中的其他字符
    '归', '望', '思', '行', '醉', '眠', '看', '听', '问', '说'
  ],
  hard: [
    // 意境字符
    '悠', '远', '寂', '静', '空', '灵', '幽', '深', '清', '雅', '淡', '霜', '梦', 
    // 李白《静夜思》的字符
    '床', '前', '明', '月', '光', '疑', '是', '地', '上', '霜', '举', '头', '望', '低', '思', '乡',
    // 杜甫《春夜喜雨》的字符
    '好', '雨', '知', '时', '节', '当', '春', '乃', '发', '生', '随', '风', '潜', '入', '夜', '润', '物', '细', '无', '声',
    // 王维《山居秋暝》的字符
    '空', '山', '新', '雨', '后', '天', '气', '晚', '来', '秋', '明', '松', '烟', '寺', '枫', '林', '晚', '渡', '人', '村'
  ]
};

export const generateConfusionChars = (
  poemChars: string[],
  level: GameLevel,
  count: number = 10
): string[] => {
  const confusionPool = CONFUSION_CHARS[level].filter(char => !poemChars.includes(char));
  const selectedConfusion = confusionPool
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
  
  return [...poemChars, ...selectedConfusion];
};

export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const calculateScore = (
  isCorrect: boolean,
  isHardMode: boolean,
  currentStreak: number
): number => {
  if (!isCorrect) return 0;
  const baseScore = isHardMode ? 2 : 1;
  const streakBonus = Math.floor(currentStreak / 3);
  return baseScore + streakBonus;
};