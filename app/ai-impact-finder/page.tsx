import AIImpactFinder from '@/components/AIImpactFinder';

export const metadata = {
  title: 'AI Impact Finder - Cyberlion',
  description: 'Identify where AI can provide real value for your business',
};

export default function AIImpactFinderPage() {
  return (
    <div className="min-h-screen py-12">
      <AIImpactFinder />
    </div>
  );
}
