'use client';

import { useState, useEffect } from 'react';

interface Entry {
    id: string;
    content: string;
    philosopher: string;
    analysis: string;
    createdat: string;
}

interface PastEntriesProps {
    userId: number;

}

export default function PastEntries({ userId }: PastEntriesProps) {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch(`/api/journal?userId=${userId}`);
                const data = await response.json();
                setEntries(data.entries);
            } catch (error) {
                console.error('Error fetching entries:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntries();
    }, [userId]);

    if (isLoading) {
        return <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 h-32 rounded-xl" />
            ))}
        </div>;
    }

    return (
        <div className="space-y-6">
            {entries.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No entries yet. Start journaling to see your past reflections.</p>
            ) : (
                entries.map((entry) => (
                    <div key={entry.id} className="bg-white rounded-xl border p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            {entry.philosopher ? <h3 className="font-medium text-gray-900">Reflection with {entry.philosopher}</h3> : <h3 className="font-medium text-gray-900">Reflection</h3>}
                            <time className="text-sm text-gray-500">
                                {new Date(entry.createdat).toLocaleString('en-US', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                    hour12: true
                                })}
                            </time>
                        </div>
                        <p className="text-gray-700">{entry.content}</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 italic">{entry.analysis}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
