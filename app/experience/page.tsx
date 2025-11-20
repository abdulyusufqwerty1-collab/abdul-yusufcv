'use client';

import { useState, useEffect } from 'react';

interface Experience {
  position: string;
  type: string;
  organization: string;
  start_year: string;
  end_year?: string;
  description?: string;
}

interface CVData {
  experiences?: Experience[];
}

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch('/api/cv');
        if (!res.ok) {
          throw new Error('Failed to load CV data');
        }
        const data: CVData = await res.json();
        setExperiences(data.experiences || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Experience History</h1>
      {experiences.length > 0 ? (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{exp.position}</h2>
              <p className="text-gray-600 mb-2">{exp.type} at {exp.organization} | {exp.start_year} - {exp.end_year || 'Present'}</p>
              <p className="text-gray-700">{exp.description || ''}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No experience data.</p>
      )}
    </div>
  );
}
