'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { GameLevel, GameState } from '@/types/game';
import { generateConfusionChars, shuffleArray, calculateScore } from '@/lib/gameUtils';
import { generatePoem } from '@/lib/services/poemService';

const ROUND_DURATION = 120; // 两分钟倒计时（秒）

export function useGameState() {
  const [isHardMode, setIsHardMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [usedPoems, setUsedPoems] = useState<string[]>([]);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean>(false);
  const [showErrorDialog, setShowErrorDialog] = useState<boolean>(false);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    streak: 0,
    currentPoem: '',
    selectedChars: [],
    availableChars: [],
    codeSnippet: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    loadNewRound();
  }, [isHardMode]);

  const handleTimeout = () => {
    toast({
      title: '时间到！',
      description: '很遗憾，本轮挑战失败',
      variant: 'destructive',
      duration: 2000,
    });
    
    setGameState(prev => ({
      ...prev,
      streak: 0,
    }));

    setTimeout(loadNewRound, 1500);
  };

  const loadNewRound = async () => {
    setIsLoading(true);
    setIsTimerActive(false);
    setShowSuccessDialog(false);
    setShowErrorDialog(false);
    try {
      const level: GameLevel = isHardMode ? 'hard' : 'easy';
      console.log('Requesting new poem with level:', level);
      
      const result = await generatePoem({
        difficulty: level,
        allUsedPoems: usedPoems
      });

      console.log('Received poem result:', result);

      if (!result.poem || !result.code) {
        console.error('Invalid response format:', result);
        throw new Error('Invalid response format from API');
      }

      const poemChars = result.poem.split('');
      const confusionCount = isHardMode ? 25 : 10;
      
      const availableChars = shuffleArray(
        generateConfusionChars(poemChars, level, confusionCount)
      );

      console.log('Setting new game state:', {
        poem: result.poem,
        code: result.code,
        availableChars
      });

      setGameState(prev => ({
        ...prev,
        currentPoem: result.poem,
        selectedChars: [],
        availableChars,
        codeSnippet: result.code,
      }));

      setUsedPoems(prev => [...prev, result.poem]);
      // 启动新一轮的倒计时
      setIsTimerActive(true);
    } catch (error) {
      console.error('Failed to load new round:', error);
      toast({
        title: '加载失败',
        description: '无法获取新的诗句，请重试',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCorrectGuess = () => {
    setIsTimerActive(false);
    const newStreak = gameState.streak + 1;
    const scoreIncrease = calculateScore(true, isHardMode, newStreak);
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + scoreIncrease,
      streak: newStreak
    }));

    // 显示成功弹窗
    setShowSuccessDialog(true);
  };

  const handleIncorrectGuess = () => {
    setGameState(prev => ({
      ...prev,
      streak: 0,
      selectedChars: [],
      availableChars: shuffleArray(prev.availableChars)
    }));

    // 显示错误弹窗
    setShowErrorDialog(true);
  };

  const handleRetry = () => {
    setGameState(prev => ({
      ...prev,
      selectedChars: [],
      availableChars: shuffleArray(prev.availableChars)
    }));
  };

  const handleCharacterSelect = (char: string, index: number) => {
    const newSelected = [...gameState.selectedChars, char];
    
    setGameState(prev => ({
      ...prev,
      selectedChars: newSelected,
      availableChars: prev.availableChars.filter((_, i) => i !== index)
    }));

    if (newSelected.join('') === gameState.currentPoem) {
      handleCorrectGuess();
    } else if (newSelected.length === gameState.currentPoem.length) {
      handleIncorrectGuess();
    }
  };

  const handleCharacterDeselect = (index: number) => {
    const char = gameState.selectedChars[index];
    setGameState(prev => ({
      ...prev,
      selectedChars: prev.selectedChars.filter((_, i) => i !== index),
      availableChars: [...prev.availableChars, char]
    }));
  };

  return {
    ...gameState,
    isHardMode,
    setIsHardMode,
    isLoading,
    isTimerActive,
    showSuccessDialog,
    setShowSuccessDialog,
    showErrorDialog,
    setShowErrorDialog,
    handleCharacterSelect,
    handleCharacterDeselect,
    loadNewRound,
    handleTimeout,
    handleRetry,
    roundDuration: ROUND_DURATION
  };
}