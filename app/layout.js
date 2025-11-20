import './globals.css';

export const metadata = {
  title: 'Curriculum Vitae',
  description: 'Personal CV website built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Curriculum Vitae</h1>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/education" className="hover:underline">Education</a></li>
              <li><a href="/experience" className="hover:underline">Experience</a></li>
              <li><a href="/skills" className="hover:underline">Skills</a></li>
              <li><a href="/portfolio" className="hover:underline">Portfolio</a></li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
          <p>&copy; {new Date().getFullYear()} Abdul Yusuf. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
