'use client';

import { useEffect, useState, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  duration: number; // 倒计时时长（秒）
  onTimeout: () => void; // 倒计时结束回调
  isActive: boolean; // 是否激活倒计时
}

export default function CountdownTimer({ duration, onTimeout, isActive }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(!isActive);
  const timeoutCalledRef = useRef(false);

  useEffect(() => {
    setIsPaused(!isActive);
    if (isActive) {
      setTimeLeft(duration);
      timeoutCalledRef.current = false;
    }
  }, [isActive, duration]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (!timeoutCalledRef.current) {
            timeoutCalledRef.current = true;
            onTimeout();
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, onTimeout]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / duration) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>
            {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
} 