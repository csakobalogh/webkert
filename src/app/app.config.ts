import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "webkert-szonyeg-webshop", appId: "1:578162414086:web:34a79add8080a911c3e987", storageBucket: "webkert-szonyeg-webshop.firebasestorage.app", apiKey: "AIzaSyBqJr0UscWrSf3w0iJnJCWRKnUewQpn-KI", authDomain: "webkert-szonyeg-webshop.firebaseapp.com", messagingSenderId: "578162414086" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
