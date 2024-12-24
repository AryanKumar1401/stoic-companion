'use client';
import { useState } from 'react';

interface Philosopher {
  id: string;
  name: string;
  description: string;
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
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string | null>(null);

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
          userId: 1,
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
    <div className="max-w-2xl mx-auto p-6" suppressHydrationWarning>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Journal Entry
          </label>
          <textarea
            value={content?content:"I want to kill myself."}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border rounded-lg shadow-sm"
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Choose Your Philosopher
          </label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {philosophers.map((philosopher) => (
              <button
                key={philosopher.id}
                type="button"
                onClick={() => setSelectedPhilosopher(philosopher.id)}
                className={`p-3 border rounded-lg text-sm ${selectedPhilosopher === philosopher.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-50'
                  }`}
              >
                <div className="font-medium">{philosopher.name}</div>
                <div className="text-xs">{philosopher.description}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={!selectedPhilosopher}
        >
          Get Philosophical Advice
        </button>
      </form>

      <div className="mt-4">
        {isLoading ? (
          <div className="flex items-center space-x-2 text-gray-600">
            <div className="w-4 h-4 border-t-2 border-b-2 border-gray-600 rounded-full animate-spin"></div>
            <p>Consulting with {selectedPhilosopher}...</p>
          </div>
        ) : result ? (
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-bold mb-2">Advice from {result.philosopher}:</h2>
            <p className="text-gray-700">{result.entry.analysis}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}