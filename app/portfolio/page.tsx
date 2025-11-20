'use client';

import { useState, useEffect } from 'react';

interface Portfolio {
  title: string;
  description: string;
  link?: string;
}

interface CVData {
  portfolios?: Portfolio[];
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPortfolios() {
      try {
        const res = await fetch('/api/cv');
        if (!res.ok) {
          throw new Error('Failed to load CV data');
        }
        const data: CVData = await res.json();
        setPortfolios(data.portfolios || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolios();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Portfolio</h1>
      {portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((portfolio, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">{portfolio.title}</h2>
              <p className="text-gray-700 mb-4">{portfolio.description}</p>
              {portfolio.link && (
                <a
                  href={portfolio.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No portfolio data.</p>
      )}
    </div>
  );
}
