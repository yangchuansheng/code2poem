'use client';

import { Button } from '@/components/ui/button';
import { SkipForward } from 'lucide-react';

interface GameControlsProps {
  onSkip: () => void;
  disabled?: boolean;
}

export default function GameControls({ onSkip, disabled }: GameControlsProps) {
  return (
    <div className="flex justify-center gap-4">
      <Button
        variant="outline"
        onClick={onSkip}
        className="flex items-center gap-2"
        disabled={disabled}
      >
        <SkipForward className="w-4 h-4" />
        跳过
      </Button>
    </div>
  );
}