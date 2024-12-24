'use client';
import { useState } from 'react';

interface Philosopher {
  id: string;
  name: string;
  description: string;
}

const philosophers: Philosopher[] = [
  { id: 'marcus', name: 'Marcus Aurelius', description: 'Stoic Emperor' },
  { id: 'nietzsche', name: 'Friedrich Nietzsche', description: 'Existentialist' },
  { id: 'kant', name: 'Immanuel Kant', description: 'Enlightenment Thinker' },
  { id: 'camus', name: 'Albert Camus', description: 'Absurdist' }
];

export default function Home() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);
  const [selectedPhilosopher, setSelectedPhilosopher] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhilosopher) {
      alert('Please select a philosopher');
      return;
    }

    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/json',
        // },
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
            value={content}
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

      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-bold mb-2">
            Advice from {philosophers.find(p => p.id === selectedPhilosopher)?.name}:
          </h2>
          <p className="text-gray-700">{result.entry?.analysis}</p>
        </div>
      )}
    </div>
  );
}