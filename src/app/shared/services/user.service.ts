import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, combineLatest, from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../models/User';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {}

  async getUserProfile(userId: string): Promise<{ user: User | null; cartItems: CartItem[]; totalItems: number }> {
    const userDocRef = doc(this.firestore, `Users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as User;
      console.log(userData)
      const cartItems = userData.cartItems || [];
      const totalItems = cartItems.length;

      return {
        user: userData,
        cartItems,
        totalItems
      };
    } else {
      return {
        user: null,
        cartItems: [],
        totalItems: 0
      };
    }
  }

  private async fetchUserData(userId: string): Promise<{
    user: User | null,
    cartItems: CartItem[],
    totalItems: number
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return this.emptyProfile();
      }

      const userData = userSnapshot.data() as User;
      const user: User = { ...userData, id: userId };
      const cartItems = user.cartItems || [];

      return {
        user,
        cartItems,
        totalItems: cartItems.length
      };
    } catch (error) {
      console.error('Error loading user data:', error);
      return this.emptyProfile();
    }
  }

  async getUserById(userId: string): Promise<User | null> {
  const userRef = doc(this.firestore, `Users/${userId}`);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? (userSnap.data() as User) : null;
}

  private emptyProfile() {
    return {
      user: null,
      cartItems: [],
      totalItems: 0
    };
  }
}