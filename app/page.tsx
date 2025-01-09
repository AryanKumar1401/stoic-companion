'use client';
import { useEffect, useState, useRef } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import QuoteCard from './components/quoteCard';
import PastEntries from './components/pastEntries';

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
  const [activeTab, setActiveTab] = useState<'journal' | 'entries'>('journal');
  const resultRef = useRef<HTMLDivElement>(null);
  const testSession = {
    user: {
      id: -1,
      name: "Test User",
      email: "test@example.com"
    },
    expires: "2100-01-01T00:00:00.000Z"
  };

  useEffect(() => {
    fetch('/api/quotes')
      .then((response) => response.json())
      .then((data) => setDailyQuote(data.quote));
  }, []);
  // Redirect unauthenticated users
  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }



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
      // Scroll to result after a short delay to ensure rendering
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
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
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center mb-4">
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

          {session && (
            <div className="flex gap-4 -mb-px">
              <button
                onClick={() => setActiveTab('journal')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'journal'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                New Entry
              </button>
              <button
                onClick={() => setActiveTab('entries')}
                className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${activeTab === 'entries'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                Past Entries
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-32 pb-12">
        {!session ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Welcome to Stoic Companion</h2>
            <p className="text-gray-600 mb-8">Sign in to start your philosophical journey.</p>
            <a href="/signin" className="px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800">
              Get Started
            </a>
          </div>
        ) : activeTab === 'journal' ? (
          <>
            <label className='text-lg font-medium text-gray-700'>Today's Quote</label>
            <div className="mb-8">
              <QuoteCard dailyQuote={dailyQuote} />
            </div>
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

            {/* Results Section - Enhanced */}
            {(isLoading || result) && (
              <div
                ref={resultRef}
                className="mt-12 transition-all duration-500 ease-in-out"
              >
                <h2 className="text-xl font-medium mb-6 text-gray-900">
                  Philosophical Insight
                </h2>

                {isLoading ? (
                  <div className="animate-pulse space-y-4 bg-white p-6 rounded-xl border">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                ) : result && (
                  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                          {result.philosopher}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">
                          {new Date().toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {result.entry.analysis}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : ( 
          <PastEntries userId={session?.user?.id} />
        )}
      </div>
    </main>
  );
}