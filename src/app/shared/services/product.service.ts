import { Injectable } from '@angular/core';
import { Firestore, collection, doc, addDoc, updateDoc, deleteDoc, getDocs, query, getDoc, where, orderBy, limit } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PRODUCTS_COLLECTION = 'Products';

  constructor(private firestore: Firestore) {}

  // C
  async addProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);
    const docRef = await addDoc(productsCollection, product);
    const id = docRef.id;
    await updateDoc(docRef, { id });
    return { ...product, id };
  }

  async addRating(productId: string, ratingValue: number): Promise<void> {
    const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);

    const docSnap = await getDoc(productDocRef);
    if (!docSnap.exists()) throw new Error('Product not found');

    const productData = docSnap.data() as Product;

    const newRatings = productData.ratings ? [...productData.ratings, { value: ratingValue }] : [{ value: ratingValue }];

    const total = newRatings.reduce((sum, r) => sum + r.value, 0);
    const avg = Math.round((total / newRatings.length) * 10) / 10;

    await updateDoc(productDocRef, {
      ratings: newRatings,
      avgRating: avg
    });
  }

  // R
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

  // U
  async updateProduct(productId: string, updatedData: Partial<Product>): Promise<void> {
    const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);
    await updateDoc(productDocRef, updatedData);
  }

  // D
  async deleteProduct(productId: string): Promise<void> {
    const productDocRef = doc(this.firestore, this.PRODUCTS_COLLECTION, productId);
    await deleteDoc(productDocRef);
  }

  // Komplex lekerdezes
  getProductsByColorSortedByPrice(color: string): Observable<Product[]> {
    const productsCollection = collection(this.firestore, this.PRODUCTS_COLLECTION);

    const q = query(
      productsCollection,
      where('color', '==', color),
      orderBy('price', 'asc')
    );

    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product)))
    );
  }

  getCheapRugs(limitCount: number): Observable<Product[]> {
    const productsRef = collection(this.firestore, this.PRODUCTS_COLLECTION);
    const q = query(
      productsRef,
      where('price', '<=', 15000),
      orderBy('price', 'asc'),
      limit(limitCount)
    );

    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Product))
    );
  }

  getTopRatedRugs(): Observable<Product[]> {
    const productsRef = collection(this.firestore, this.PRODUCTS_COLLECTION);
    const q = query(
      productsRef,
      where('avgRating', '>=', 4),
      orderBy('avgRating', 'desc'),
      limit(10)
    );

    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }) as Product))
    );
  }

}