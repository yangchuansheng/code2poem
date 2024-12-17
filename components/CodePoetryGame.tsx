'use client';

import { Code2, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import CodeDisplay from '@/components/game/CodeDisplay';
import CharacterGrid from '@/components/game/CharacterGrid';
import GameHeader from '@/components/game/GameHeader';
import GameControls from '@/components/game/GameControls';
import CountdownTimer from '@/components/game/CountdownTimer';
import SuccessDialog from '@/components/game/SuccessDialog';
import ErrorDialog from '@/components/game/ErrorDialog';
import { useGameState } from '@/hooks/useGameState';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodePoetryGame() {
  const {
    isHardMode,
    setIsHardMode,
    score,
    streak,
    selectedChars,
    availableChars,
    codeSnippet,
    currentPoem,
    handleCharacterSelect,
    handleCharacterDeselect,
    loadNewRound,
    isLoading,
    isTimerActive,
    handleTimeout,
    roundDuration,
    showSuccessDialog,
    setShowSuccessDialog,
    showErrorDialog,
    setShowErrorDialog,
    handleRetry
  } = useGameState();
  
  return (
    <div className="space-y-3 px-2 py-2 sm:space-y-4 sm:px-4 sm:py-4 md:space-y-8 md:py-6 max-w-7xl mx-auto">
      <GameHeader 
        isHardMode={isHardMode}
        setIsHardMode={setIsHardMode}
        score={score}
        streak={streak}
      />

      <div className="grid gap-3 sm:gap-4 md:gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="p-2 sm:p-3 md:p-6 backdrop-blur-sm bg-card/90 shadow-xl h-full">
            <div className="flex items-center justify-between mb-2 sm:mb-4 md:mb-6">
              <div className="flex items-center space-x-2 md:space-x-3">
                <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                <h2 className="text-base sm:text-lg md:text-xl font-semibold">诗句</h2>
              </div>
              <div className="w-20 sm:w-24 md:w-32">
                <CountdownTimer
                  duration={roundDuration}
                  onTimeout={handleTimeout}
                  isActive={isTimerActive}
                />
              </div>
            </div>
            <div className="space-y-2 sm:space-y-4 md:space-y-6">
              <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 min-h-[48px] sm:min-h-[60px] p-1.5 sm:p-2 md:p-4 bg-muted/50 rounded-lg">
                <AnimatePresence>
                  {selectedChars.map((char, i) => (
                    <motion.button
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      onClick={() => handleCharacterDeselect(i)}
                      disabled={isLoading || showSuccessDialog || showErrorDialog}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center text-sm sm:text-base md:text-lg font-bold bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-primary/90 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {char}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
              <div className="w-full overflow-hidden">
                <CharacterGrid
                  characters={availableChars}
                  onSelect={handleCharacterSelect}
                  disabled={isLoading || showSuccessDialog || showErrorDialog}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full min-w-0"
        >
          <Card className="h-full">
            <div className="flex items-center gap-2 px-4 py-2 border-b">
              <Code2 className="w-4 h-4" />
              <h2 className="font-medium">代码</h2>
            </div>
            <div className="p-2 sm:p-3 md:p-4 overflow-hidden">
              <CodeDisplay code={codeSnippet} />
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <GameControls 
          onSkip={loadNewRound} 
          disabled={isLoading || showSuccessDialog || showErrorDialog}
        />
      </motion.div>

      <SuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
        poem={currentPoem}
        streak={streak}
        onNext={loadNewRound}
      />

      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        onRetry={handleRetry}
        onSkip={loadNewRound}
      />
    </div>
  );
}