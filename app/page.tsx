import CodePoetryGame from '@/components/CodePoetryGame';

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <CodePoetryGame />
      </div>
    </main>
  );
}