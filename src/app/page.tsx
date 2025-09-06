export const dynamic = 'force-static';
export const revalidate = false;

import { Monogram } from '@/components/ui/monogram';

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-0rem)] items-center justify-center p-6">
      <section className="flex max-w-2xl flex-col items-center space-y-6 text-center">
        <div className="flex items-center justify-center rounded-full p-2 text-slate-800 shadow-sm">
          <Monogram size={400} />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Allard van Helbergen</h1>
          <p className="mx-auto max-w-prose leading-relaxed text-slate-600">
            Principal product designer · Design systems · Frontend afficionado
          </p>
        </div>
      </section>
    </main>
  );
}
