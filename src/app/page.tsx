// 'use client';  // Mark this as a Client Component
// import { usePathname } from 'next/navigation';  
// import { AppProps } from 'next/app';
// import { JSX } from 'react';
// import HomePage from './Homepage/HomePage';
// import ContactPage from './contact/page';

// function MyApp({ Component, pageProps }: AppProps) {
//   const pathname = usePathname();  // Get the current route path

//   // Centralized Route Configuration
//   const routes: { [key: string]: JSX.Element } = {
//     '/': <HomePage />,
//     //add more routes here
//     '/contact': <ContactPage />,
//   };

//   // Check if the route exists, otherwise show NotFoundPage
//   const CurrentPage = routes[pathname] ;

//   return (
//     <div>
//       {CurrentPage}
//     </div>
//   );
// }

// export default MyApp;


'use client';
import { usePathname } from 'next/navigation';
import { AppProps } from 'next/app';

import HomePage from './Homepage/HomePage';
import ContactPage from './contact/page';
import { AuthProvider } from '@/libs/context/AuthContext';
import { JSX } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const pathname = usePathname();

  const routes: { [key: string]: JSX.Element } = {
    '/': <HomePage />,
    '/contact': <ContactPage />,
  };

  const CurrentPage = routes[pathname] || <Component {...pageProps} />; // Fallback to default Component

  return (
    <AuthProvider>
      <div>
        {CurrentPage}
      </div>
    </AuthProvider>
  );
}

export default MyApp;