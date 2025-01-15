'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    id: string;
  };
  createdAt: string;
  commentCount: number;
}

interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    id: string;
  };
  createdAt: string;
}

export default function ForumPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isCreatingThread, setIsCreatingThread] = useState(false);
  
  // const session = {
  //   user: {
  //     id: "1",
  //     name: "Test User"
  //   }
  // };

  useEffect(() => {
    // Mock data - replace with actual API call
    setThreads([
      {
        id: '1',
        title: 'Discussing Stoic Philosophy',
        content: 'What are your thoughts on Marcus Aurelius\' Meditations?',
        author: { name: 'PhilosophyFan', id: '1' },
        createdAt: '2024-01-20T12:00:00Z',
        commentCount: 5
      },
      // Add more mock threads...
    ]);
  }, []);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call to create thread
    setIsCreatingThread(false);
    setNewThreadTitle('');
    setNewThreadContent('');
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call to submit comment
    setNewComment('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-6 text-gray-600 hover:text-gray-900">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </span>
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Philosophy Forum</h1>
          <button
            onClick={() => setIsCreatingThread(true)}
            className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            New Thread
          </button>
        </div>

        {isCreatingThread && (
          <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
            <form onSubmit={handleCreateThread} className="space-y-4">
              <input
                type="text"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                placeholder="Thread Title"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
                placeholder="Thread Content"
                className="w-full p-2 border rounded-lg"
                rows={4}
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg"
                >
                  Create Thread
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingThread(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {selectedThread ? (
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <button
                  onClick={() => setSelectedThread(null)}
                  className="text-gray-500 mb-4"
                >
                  ← Back to threads
                </button>
                <h2 className="text-xl font-bold mb-2">{selectedThread.title}</h2>
                <p className="text-gray-700 mb-4">{selectedThread.content}</p>
                <div className="text-sm text-gray-500">
                  Posted by {selectedThread.author.name} on{' '}
                  {new Date(selectedThread.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-medium mb-4">Comments</h3>
                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{comment.content}</p>
                      <div className="text-sm text-gray-500 mt-2">
                        {comment.author.name} •{' '}
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmitComment}>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full p-2 border rounded-lg mb-2"
                    rows={3}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded-lg"
                  >
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          ) : (
            threads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedThread(thread)}
              >
                <h3 className="text-lg font-medium mb-2">{thread.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-2">{thread.content}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{thread.author.name}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{thread.commentCount} comments</span>
                </div>
              </div>

            ))
          )}
          (Still in the works!)
        </div>
      </div>
    </div>
  );
}
