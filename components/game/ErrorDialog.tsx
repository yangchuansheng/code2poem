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
import { XCircle, RotateCcw, ArrowRight } from 'lucide-react';

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
  onSkip: () => void;
}

export default function ErrorDialog({ isOpen, onClose, onRetry, onSkip }: ErrorDialogProps) {
  const handleRetry = () => {
    onClose();
    onRetry();
  };

  const handleSkip = () => {
    onClose();
    onSkip();
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
              className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900"
            >
              <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </motion.div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-center">答错了，别灰心！</h3>
              <p className="text-sm text-muted-foreground text-center">
                要继续挑战这一题，还是跳到下一题？
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="mt-4 flex gap-2 sm:gap-0">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleRetry}
          >
            <RotateCcw className="w-4 h-4" />
            <span>继续挑战</span>
          </Button>
          <Button
            variant="default"
            className="flex-1 flex items-center justify-center gap-2"
            onClick={handleSkip}
          >
            <span>下一题</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 