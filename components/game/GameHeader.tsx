'use client';

import { Code2, Sparkles } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GameHeaderProps {
  isHardMode: boolean;
  setIsHardMode: (value: boolean) => void;
  score: number;
  streak: number;
}

export default function GameHeader({ isHardMode, setIsHardMode, score, streak }: GameHeaderProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col items-center space-y-6 mb-8 w-full px-4"
    >
      <div className="relative flex items-center space-x-3">
        <Code2 className="w-8 h-8 text-primary animate-float" />
        <h1 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          代码诗词猜猜猜
        </h1>
        <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse-slow" />
      </div>
      
      <div className="flex flex-col items-center gap-4 bg-card/50 backdrop-blur-sm p-4 rounded-full shadow-lg w-full max-w-xl">
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-3 px-4 cursor-pointer">
                <Switch
                  checked={isHardMode}
                  onCheckedChange={setIsHardMode}
                  className="data-[state=checked]:bg-purple-600"
                />
                <Label className="font-medium select-none">
                  困难模式
                </Label>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" sideOffset={10} className="max-w-[200px]">
              <p className="font-medium mb-1">困难模式特点：</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>更多的字符选择</li>
                <li>更复杂的代码</li>
                <li>更高的得分奖励</li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex items-center gap-4">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 bg-secondary rounded-full px-4 py-1.5 cursor-pointer select-none">
                  <span className="text-lg">🏆</span>
                  <span className="font-bold text-lg tabular-nums">{score}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" align="center" sideOffset={10} className="max-w-[200px]">
                <p className="font-medium">总分数</p>
                <div className="text-sm text-muted-foreground space-y-1 mt-1">
                  <p>答对题目 +1 分</p>
                  <p>困难模式 +2 分</p>
                  <p>每三连胜 +1 分</p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {streak > 0 && (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center space-x-2 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 rounded-full px-4 py-1.5 cursor-pointer select-none"
                  >
                    <span className="text-lg">🔥</span>
                    <span className="font-bold text-lg tabular-nums">x{streak}</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" sideOffset={10} className="max-w-[200px]">
                  <p className="font-medium">连胜次数</p>
                  <div className="text-sm text-muted-foreground space-y-1 mt-1">
                    <p>已连续答对 {streak} 题</p>
                    <p>每三连胜可获得额外分数</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </motion.div>
  );
}