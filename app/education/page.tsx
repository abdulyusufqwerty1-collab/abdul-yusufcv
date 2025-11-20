'use client';

import { useState, useEffect } from 'react';

interface Education {
  institution: string;
  level: string;
  start_year: string;
  end_year?: string;
  description?: string;
}

interface CVData {
  educations?: Education[];
}

export default function EducationPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEducations() {
      try {
        const res = await fetch('/api/cv');
        if (!res.ok) {
          throw new Error('Failed to load CV data');
        }
        const data: CVData = await res.json();
        setEducations(data.educations || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchEducations();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Riwayat Pendidikan</h1>
      {educations.length > 0 ? (
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{edu.institution}</h2>
              <p className="text-gray-600 mb-2">{edu.level} | {edu.start_year} - {edu.end_year || 'Sekarang'}</p>
              <p className="text-gray-700">{edu.description || ''}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Tidak ada data pendidikan.</p>
      )}
    </div>
  );
}
