'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import QuoteCard from './components/quoteCard';

interface Philosopher {
  id: string;
  name: string;
  description: string;
}

interface Quote {
  text: string;
  author: string;
}

const philosophers: Philosopher[] = [
  { id: 'Marcus', name: 'Marcus Aurelius', description: 'Stoic Emperor' },
  { id: 'Nietzsche', name: 'Friedrich Nietzsche', description: 'Existentialist' },
  { id: 'Kant', name: 'Immanuel Kant', description: 'Enlightenment Thinker' },
  { id: 'Camus', name: 'Albert Camus', description: 'Absurdist' },
  { id: 'Aristotle', name: 'Aristotle', description: 'Classical Greek' },
  { id: 'Socrates', name: 'Socrates', description: 'Classical Greek' },
  { id: 'Kierkegaard', name: 'Søren Kierkegaard', description: 'Existentialist' },
  { id: 'Sartre', name: 'Jean-Paul Sartre', description: 'Existentialist' }
];

export default function Home() {
  const [content, setContent] = useState('');
  interface JournalResult {
    philosopher: string;
    entry: {
      analysis: string;
    };
  }
  const { data: session, status } = useSession();
  const [result, setResult] = useState<JournalResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string | null>(null);
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((data) => setDailyQuote(data.quote));
  }, []);
  // Redirect unauthenticated users
  if (status === 'loading') {
    return <div>Loading...</div>;
  }



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhilosopher) {
      alert('Please select a philosopher');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user.id ?? -1, // Include user ID from session,
          content,
          philosopher: selectedPhilosopher
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-radial">
      {/* Auth Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Stoic Companion
          </h1>
          <div className="flex gap-4 items-center">
            {session ? (
              <>
                <span className="text-sm text-gray-600">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-full transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="/signin" className="text-sm text-gray-600 hover:text-gray-900">
                  Sign in
                </a>
                <a href="/signup" className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800">
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
        {/* Quote Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            Your Quote of the Day
          </h2>
          <QuoteCard dailyQuote={dailyQuote} />
        </div>

        {/* Journal Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              Share your thoughts
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full p-4 bg-white border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
              rows={6}
            />
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              Choose your philosophical guide
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {philosophers.map((philosopher) => (
                <button
                  key={philosopher.id}
                  type="button"
                  onClick={() => setSelectedPhilosopher(philosopher.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 ${selectedPhilosopher === philosopher.id
                    ? 'bg-black text-white border-black shadow-lg scale-105'
                    : 'bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                >
                  <div className="font-medium">{philosopher.name}</div>
                  <div className="text-xs opacity-75">{philosopher.description}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedPhilosopher || isLoading}
            className="w-full py-4 bg-black text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Consulting...' : 'Get Philosophical Insight'}
          </button>
        </form>

        {/* Results Section */}
        {result && (
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border shadow-sm">
            <h2 className="text-xl font-medium mb-4">
              Wisdom from {result.philosopher}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {result.entry.analysis}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}