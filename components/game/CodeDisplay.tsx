'use client';

import { Card } from '@/components/ui/card';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';

interface CodeDisplayProps {
  code: string;
}

export default function CodeDisplay({ code }: CodeDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="bg-[#1E1E1E] overflow-hidden rounded-lg shadow-xl">
        <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-[#2D2D2D] border-b border-[#1E1E1E]">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            <div className="min-w-[200px] p-1.5 sm:p-2 md:p-4">
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  background: 'transparent',
                  padding: 0,
                  fontSize: '0.75rem',
                  lineHeight: '1.4',
                  minWidth: '100%',
                  width: 'fit-content',
                }}
                showLineNumbers={false}
                wrapLongLines={false}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-5 md:w-6 bg-gradient-to-l from-[#1E1E1E] to-transparent pointer-events-none" />
        </div>
      </Card>
    </motion.div>
  );
}