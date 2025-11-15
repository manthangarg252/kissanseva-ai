// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import { Toaster } from '@/components/ui/toaster';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'KissansevaAI',
//   description:
//     'A Smart Agriculture Assistant that integrates multiple AI models and provides localized, data-driven guidance to farmers.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.className} antialiased`}>
//         {children}
//         <Toaster />
//       </body>
//     </html>
//   );
// }import type { Metadata } from 'next';
import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KissansevaAI',
  description:
    'A Smart Agriculture Assistant that integrates multiple AI models and provides localized, data-driven guidance to farmers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        {/* ALL CLIENT PROVIDERS */}
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
