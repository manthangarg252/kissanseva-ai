
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function initializeFirebase() {
    if (getApps().length) {
        const app = getApp();
        const auth = getAuth(app);
        const db = getFirestore(app);
        return { app, auth, db };
    }

    if (!firebaseConfig.apiKey) {
        console.error("Firebase API Key is missing. Check your .env file and environment variables.");
        // We are not throwing an error here to avoid crashing the server on build
        // The app will fail gracefully on pages that require Firebase if the key is missing
        return { app: null, auth: null, db: null };
    }
    
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    return { app, auth, db };
}


export async function getFirebaseServices() {
    const services = initializeFirebase();
    if (!services.app) {
        return Promise.reject("Firebase initialization failed. API key might be missing.");
    }
    return services as { app: FirebaseApp; auth: Auth; db: Firestore; };
}

// This export remains for any parts of the app that might still use it,
// but it will fail gracefully if config is missing.
export { initializeFirebase };
