import './globals.css';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: '代码诗词游戏',
  description: '一个有趣的代码和诗词结合的游戏',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={cn('font-inter')} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
