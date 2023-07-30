import { initializeApp, credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import {
  FIREBASE_ADMIN_PRIVATE_KEY,
  FIREBASE_ADMIN_CLIENT_EMAIL,
  FIREBASE_ADMIN_PROJECT_ID,
} from '$env/static/private';

try {
  initializeApp({
    credential: credential.cert({
      projectId: FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: FIREBASE_ADMIN_PRIVATE_KEY,
    }),
  });
} catch (err: any) {
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin error: ', err.stack);
  }
}

export const adminAuth = getAuth();
export const adminFirestore = getFirestore();
