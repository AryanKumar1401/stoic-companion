'use client';
import { useState } from 'react';

export default function journal() {
  const [content, setContent] = useState('');
  const [result, setResult] = useState<{ entry: { analysis: string } } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // hardcoded for testing
          content: content
        }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <main className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your journal entry"
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Get Stoic Advice
        </button>
      </form>

      {result && (
        <div className="mt-4">
          <h2>Stoic Analysis:</h2>
          <p>{result.entry.analysis}</p>
        </div>
      )}
    </main>
  );
}