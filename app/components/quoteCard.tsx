"use client";

interface Quote {
    text: string;
    author: string;
}

interface QuoteCardProps {
    dailyQuote: Quote | null;
}

export default function QuoteCard({ dailyQuote }: QuoteCardProps) {
    if (!dailyQuote) {
        return (
            <section className="mb-12">
                <div className="animate-pulse ">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-24 bg-gray-200 rounded"></div>
                </div>
            </section>
        );
    }

    return (
        <section className="mb-12">
            <div className="p-6 bg-white rounded-2xl shadow-sm border">
                <div className="space-y-4">
                    <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                    <blockquote className="text-2xl font-light text-gray-700">
                        {dailyQuote.text}
                    </blockquote>
                    <footer className="text-right">
                        <cite className="text-sm text-gray-500 not-italic">
                            ― {dailyQuote.author}
                        </cite>
                    </footer>
                </div>
            </div>
        </section>
    );
}