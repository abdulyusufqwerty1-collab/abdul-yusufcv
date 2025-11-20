import { NextResponse } from 'next/server';

export async function GET() {
  const cvData = {
    personalInfo: {
      name: 'Abdul Yusuf',
      bio: 'Seorang pengembang web yang antusias dengan pengalaman dalam React dan Next.js.',
      email: 'abdulyusufqwerty1@gmail.com',
      phone: '087791045703',
      address: 'Kp Narogong',
      dateOfBirth: '21 April 1997',
      photo_path: 'https://randomuser.me/api/portraits/men/1.jpg' // Profile photo of a man wearing a tie
    },
    educations: [
      {
        institution: 'Universitas Muhammadiyah sukabumi',
        level: 'Sarjana Teknik Informatika',
        description: 'Fokus pada pengembangan perangkat lunak dan kecerdasan buatan.'
      }
    ],
    skills: [
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'React', level: 'Intermediate' },
      { name: 'Next.js', level: 'Intermediate' },
      { name: 'TypeScript', level: 'Beginner' },
      { name: 'Penghafal Qur\'an', level: 'Advanced' }
    ],
    experiences: [
      {
        position: 'Frontend Developer',
        type: 'Full-time',
        organization: 'Tech Company',
        start_year: '2022',
        end_year: 'Sekarang',
        description: 'Mengembangkan aplikasi web menggunakan React dan Next.js.'
      }
    ],
    portfolios: [
      {
        title: 'Proyek CV Online',
        description: 'Website CV interaktif menggunakan Next.js.',
        link: 'https://github.com/yusuf/cv-project'
      },
      {
        title: 'E-commerce Website',
        description: 'Platform e-commerce sederhana dengan fitur keranjang belanja dan pembayaran.',
        link: 'https://github.com/yusuf/ecommerce-project'
      }
    ],
    hobbies: [
      { name: 'Membaca Buku' },
      { name: 'Olahraga' },
      { name: 'Fotografi' },
      { name: 'Bermain Musik' }
    ]
  };

  return NextResponse.json(cvData);
}
