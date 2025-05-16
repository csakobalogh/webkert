import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, getDoc, deleteDoc, query, writeBatch, getDocs } from '@angular/fire/firestore';
import { CartItem } from '../models/CartItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private firestore: Firestore) {}

  private getCartItemsCollection(userId: string) {
    return collection(this.firestore, `Users/${userId}/cartItems`);
  }

  getCartItems(userId: string): Observable<CartItem[]> {
    const cartCollection = this.getCartItemsCollection(userId);
    return collectionData(cartCollection, { idField: 'id' }) as Observable<CartItem[]>;
  }

  async addToCart(userId: string, item: CartItem): Promise<void> {
    const cartCollection = this.getCartItemsCollection(userId);
    const itemDoc = doc(cartCollection, item.id);
    const existingItem = await getDoc(itemDoc);

    if (!existingItem.exists()) {
      await setDoc(itemDoc, item);
    }
  }

  async removeFromCart(userId: string, itemId: string): Promise<void> {
    const itemDoc = doc(this.firestore, `Users/${userId}/cartItems/${itemId}`);
    await deleteDoc(itemDoc);
  }

  async clearCart(userId: string): Promise<void> {
    const cartCollection = this.getCartItemsCollection(userId);
    const q = query(cartCollection);
    const querySnapshot = await getDocs(q);

    const batch = writeBatch(this.firestore);
    querySnapshot.forEach(docSnap => {
      batch.delete(docSnap.ref);
    });
    await batch.commit();
  }
}
