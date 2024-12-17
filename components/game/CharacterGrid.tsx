'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface CharacterGridProps {
  characters: string[];
  onSelect: (char: string, index: number) => void;
  disabled?: boolean;
}

export default function CharacterGrid({ characters, onSelect, disabled }: CharacterGridProps) {
  return (
    <div className="w-full grid grid-cols-5 gap-1.5 sm:gap-2 md:gap-3">
      {characters.map((char, index) => (
        <motion.div
          key={char + index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="w-full"
        >
          <Button
            variant="outline"
            className="w-full aspect-square text-sm sm:text-base md:text-lg font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-110 p-0"
            onClick={() => onSelect(char, index)}
            disabled={disabled}
          >
            {char}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}