// Import the functions you need from the SDKs you need
import {
  GoogleAuthProvider,
  OAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut as authSignOut,
  type AuthProvider,
  type User,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { derived, writable, type Readable } from 'svelte/store';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCFm3xUUnPYSj9Lk-hPH9JjFpDExB0VPEI',
  authDomain: 'rice-cracker-dev-rice-software.firebaseapp.com',
  projectId: 'rice-cracker-dev-rice-software',
  storageBucket: 'rice-cracker-dev-rice-software.appspot.com',
  messagingSenderId: '277156202255',
  appId: '1:277156202255:web:0f03b1ef93150c34a6e07a',
  measurementId: 'G-V2LVWFDSXH',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const firestore = getFirestore();

export const providers: {
  provider: AuthProvider;
  title: string;
  icon: string;
}[] = [
  {
    provider: new GoogleAuthProvider(),
    title: 'Google',
    icon: 'fa6-brands:google',
  },
  {
    provider: new OAuthProvider('microsoft.com'),
    title: 'Microsoft',
    icon: 'fa6-brands:google',
  },
];

export const signInWithProvider = async (provider: AuthProvider) => {
  await signInWithPopup(auth, provider);
};

export const signOut = async () => await authSignOut(auth);

/**
 * @returns a store with the current firebase user
 */
function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn('Auth is not initialized or not in browser');
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }

  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
  };
}

export const user = userStore();

/**
 * @param  {string} path document path or reference
 * @returns a store with realtime updates on document data
 */
export function docStore<T>(path: string) {
  let unsubscribe: () => void;

  const docRef = doc(firestore, path);

  const { subscribe } = writable<T | null>(null, (set) => {
    unsubscribe = onSnapshot(docRef, (snapshot) => {
      set((snapshot.data() as T) ?? null);
    });

    return () => unsubscribe();
  });

  return {
    subscribe,
    ref: docRef,
    id: docRef.id,
  };
}

interface UserData {
  username: string;
  bio: string;
  photoURL?: string | null;
}

export const userData: Readable<UserData | null> = derived(user, ($user, set) => {
  if ($user) {
    return docStore<UserData>(`users/${$user.uid}`).subscribe(set);
  } else {
    set(null);
  }
});
