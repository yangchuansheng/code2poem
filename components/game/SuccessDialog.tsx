'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  poem: string;
  streak: number;
  onNext: () => void;
}

export default function SuccessDialog({ isOpen, onClose, poem, streak, onNext }: SuccessDialogProps) {
  const handleNext = () => {
    onClose();
    onNext();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900"
            >
              <Sparkles className="w-8 h-8 text-green-600 dark:text-green-400" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-center">答对啦，你真棒！</h3>
              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-medium text-muted-foreground">
                  {poem}
                </p>
                {streak > 1 && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-orange-500 dark:text-orange-400"
                  >
                    您已连续答对: {streak} 题啦！
                  </motion.p>
                )}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={handleNext}
          >
            <span>下一题</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 