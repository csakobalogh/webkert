import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, getDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PRODUCTS_COLLECTION = 'Products';

  constructor(private firestore: Firestore) {}

  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsCollection, product);
    const id = docRef.id;
    await updateDoc(docRef, { id });
    return { ...product, id };
  }

  getAllProducts(): Observable<Product[]> {
    const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
    return from(getDocs(productsCollection)).pipe(
      map(querySnapshot => querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product)))
    );
  }

  async getProductById(productId: string): Promise<Product | null> {
    const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);
    const docSnap = await getDoc(productDocRef);
    if (docSnap.exists()) {
      return { ...(docSnap.data() as Product), id: docSnap.id };
    }
    return null;
  }

  async updateProduct(productId: string, updatedData: Partial<Product>): Promise<void> {
    const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);
    await updateDoc(productDocRef, updatedData);
  }

  async deleteProduct(productId: string): Promise<void> {
    const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);
    await deleteDoc(productDocRef);
  }
}