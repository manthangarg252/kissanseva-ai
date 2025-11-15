
// 'use client';

// import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
// import type { FirebaseApp } from 'firebase/app';
// import type { Auth } from 'firebase/auth';
// import type { Firestore } from 'firebase/firestore';
// import { initializeFirebase } from '@/lib/firebase';
// import { Leaf } from 'lucide-react';

// interface FirebaseContextValue {
//   app: FirebaseApp;
//   auth: Auth;
//   db: Firestore;
// }

// const FirebaseContext = createContext<FirebaseContextValue | null>(null);

// export function FirebaseProvider({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const [services, setServices] = useState<FirebaseContextValue | null>(null);

//   useEffect(() => {
//     try {
//       const firebaseServices = initializeFirebase();
//       if(firebaseServices.app) {
//         setServices(firebaseServices as FirebaseContextValue);
//       }
//     } catch (error) {
//       console.error("Firebase initialization error:", error);
//     }
//   }, []);

//   if (!services) {
//     // Render a loading state while Firebase is initializing
//     return (
//       <div className="relative flex min-h-screen w-full items-center justify-center bg-black">
//         <div className="flex flex-col items-center justify-center text-white text-center">
//           <Leaf className="h-16 w-16 animate-spin text-primary mb-4" />
//           <h1 className="text-2xl font-bold">KissansevaAI</h1>
//           <p className="text-muted-foreground mt-2">Initializing Firebase...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <FirebaseContext.Provider value={services}>
//       {children}
//     </FirebaseContext.Provider>
//   );
// }

// export function useFirebase() {
//   const context = useContext(FirebaseContext);
//   if (!context) {
//     throw new Error('useFirebase must be used within a FirebaseProvider');
//   }
//   return context;
// }
'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { initializeFirebase } from '@/lib/firebase';
import { Leaf } from 'lucide-react';

interface FirebaseContextValue {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

const FirebaseContext = createContext<FirebaseContextValue | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<FirebaseContextValue | null>(null);

  useEffect(() => {
    try {
      const firebaseServices = initializeFirebase();
      if (firebaseServices?.app) {
        setServices(firebaseServices as FirebaseContextValue);
      }
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  }, []);

  if (!services) {
  return (
    <div suppressHydrationWarning>
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center justify-center text-white text-center">
          <Leaf className="h-16 w-16 animate-spin text-green-500 mb-4" />
          <h1 className="text-2xl font-bold">KissansevaAI</h1>
          <p className="mt-2 text-gray-400">Initializing Firebase...</p>
        </div>
      </div>
    </div>
  );
}

  return (
    <FirebaseContext.Provider value={services}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}
