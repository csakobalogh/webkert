import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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

  getUserProfile(): Observable<{
    user: User | null,
    cartItems: CartItem[],
    totalItems: number
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of(this.emptyProfile());
        }
        return from(this.fetchUserData(authUser.uid));
      })
    );
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

  private emptyProfile() {
    return {
      user: null,
      cartItems: [],
      totalItems: 0
    };
  }
}