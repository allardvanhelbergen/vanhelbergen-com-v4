// Explicitly mark this page for static generation.
export const dynamic = 'force-static';
export const revalidate = false;

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 p-6">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Allard van Helbergen</h1>
        <p className="leading-relaxed text-slate-600">
          Building a fast, accessible, content‑driven site. This is the initial scaffold.
        </p>
      </section>
    </main>
  );
}
