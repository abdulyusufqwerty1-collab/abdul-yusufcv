// app/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface PersonalInfo {
  name?: string;
  bio?: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  photo_path?: string;
}

interface Education {
  institution: string;
  level: string;
  start_year: string;
  end_year?: string;
  description?: string;
}

interface Skill {
  name: string;
  level?: string;
}

interface Experience {
  position: string;
  type: string;
  organization: string;
  start_year: string;
  end_year?: string;
  description?: string;
}

interface Portfolio {
  title: string;
  description: string;
  link?: string;
}

interface Hobbies {
  name: string;
}

interface CVData {
  personalInfo?: PersonalInfo;
  educations?: Education[];
  experiences?: Experience[];
  skills?: Skill[];
  portfolios?: Portfolio[];
  hobbies?: Hobbies[];
}

export default function Home() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCVData() {
      try {
        const res = await fetch('/api/cv');
        if (!res.ok) {
          throw new Error('Failed to load CV data');
        }
        const data = await res.json();
        setCvData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCVData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading CV...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (!cvData) return <div className="text-center py-8">No CV data available.</div>;

  const { personalInfo, educations, experiences, skills, portfolios, hobbies } = cvData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar untuk Info Pribadi */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-200">
              {personalInfo?.photo_path && (
                <img
                  src={personalInfo.photo_path}
                  alt="Profile Photo"
                  className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500 shadow-lg"
                />
              )}
              <h2 className="text-3xl font-bold mb-3 text-gray-900">{personalInfo?.name || 'Full Name'}</h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">{personalInfo?.bio || 'Short Description'}</p>
              {personalInfo?.dateOfBirth && (
                <p className="text-gray-500 mb-6 text-sm">📅 Tanggal Lahir: {personalInfo.dateOfBirth}</p>
              )}
              <hr className="mb-6 border-gray-300" />
              <ul className="text-left space-y-4">
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3">📧</span>
                  <strong className="text-gray-700">Email:</strong>
                  <span className="ml-2 text-gray-600">{personalInfo?.email || 'email@example.com'}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3">📱</span>
                  <strong className="text-gray-700">Phone:</strong>
                  <span className="ml-2 text-gray-600">{personalInfo?.phone || '-'}</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-600 mr-3">🏠</span>
                  <strong className="text-gray-700">Address:</strong>
                  <span className="ml-2 text-gray-600">{personalInfo?.address || '-'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Konten Utama */}
          <div className="w-full lg:w-2/3 space-y-12">
            {/* Riwayat Pendidikan */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="text-blue-600 mr-3">🎓</span> Education History
              </h3>
              {educations && educations.length > 0 ? (
                educations.map((edu, index) => (
                  <div key={index} className="mb-6 p-6 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{edu.institution}</h4>
                    <p className="text-blue-600 mb-3 font-medium">{edu.level} | {edu.start_year} - {edu.end_year || 'Present'}</p>
                    <p className="text-gray-700 leading-relaxed">{edu.description || ''}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No education data.</p>
              )}
            </section>

            {/* Keahlian */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="text-blue-600 mr-3">💡</span> Skills
              </h3>
              {skills && skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow">
                      {skill.name} {skill.level && `(${skill.level})`}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No skills data.</p>
              )}
            </section>

            {/* Riwayat Pengalaman */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="text-blue-600 mr-3">💼</span> Experience History
              </h3>
              {experiences && experiences.length > 0 ? (
                experiences.map((exp, index) => (
                  <div key={index} className="mb-6 p-6 bg-gray-50 rounded-lg border-l-4 border-green-500">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{exp.position}</h4>
                    <p className="text-green-600 mb-3 font-medium">{exp.type} at {exp.organization} | {exp.start_year} - {exp.end_year || 'Present'}</p>
                    <p className="text-gray-700 leading-relaxed">{exp.description || ''}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No experience data.</p>
              )}
            </section>

            {/* Portofolio */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="text-blue-600 mr-3">🚀</span> Portfolio
              </h3>
              {portfolios && portfolios.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolios.map((portfolio, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200">
                      <h4 className="text-lg font-semibold mb-3 text-gray-900">{portfolio.title}</h4>
                      <p className="text-gray-700 mb-4 leading-relaxed">{portfolio.description}</p>
                      {portfolio.link && (
                        <a
                          href={portfolio.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                        >
                          View Project →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No portfolio data.</p>
              )}
            </section>

            {/* Hobi */}
            <section className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-3xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="text-blue-600 mr-3">🎨</span> Hobbies
              </h3>
              {hobbies && hobbies.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {hobbies.map((hobby: Hobbies, index: number) => (
                    <span key={index} className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow">
                      {hobby.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No hobbies data.</p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
