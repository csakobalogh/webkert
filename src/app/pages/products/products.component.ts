import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../shared/models/Product';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";
import { SizeFormatPipe } from "../../shared/pipes/size-format.pipe";
import { Router, RouterLink } from '@angular/router';
import { Rating } from '../../shared/models/Rating';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { CartItem } from '../../shared/models/CartItem';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    CurrencyFormatPipe, 
    SizeFormatPipe,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  userId: string = '';
  isLoggedIn = false;
  products: Product[] = [];
  cartItems: CartItem[] = [];
  selectedRatings: { [productId: string]: number } = {};

  constructor(
    private router: Router, 
    private productService: ProductService, 
    private cartService: CartService
  ) {}

   ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.userId = localStorage.getItem('userId') || '';

    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });

    if (this.isLoggedIn && this.userId) {
      this.cartService.getCartItems(this.userId).subscribe(items => {
        this.cartItems = items;
      });
    }
  }

  submitRating(product: Product): void {
    const rating = this.selectedRatings[product.id];
    if (!rating) return;

    this.productService.addRating(product.id, rating).then(() => {
      // Frissítés helyben
      product.ratings.push({ value: rating });
      this.selectedRatings[product.id] = 0;
    }).catch(err => console.error('Hiba értékeléskor:', err));
  }

   async addToCart(product: Product): Promise<void> {
    if (!this.isLoggedIn || !this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    };

    await this.cartService.addToCart(this.userId, cartItem);
    this.router.navigate(['/cart']);
  }
  getAverageRating(ratings: Rating[]): number {
  if (!ratings || ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, r) => acc + r.value, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
}

  // getAverageRating(ratings: Rating[]): number {
  //   if (ratings.length === 0) return 0;
  
  //   let sum = 0;
  //   for (let i = 0; i < ratings.length; i++) {
  //     sum += ratings[i].value;
  //   }
  
  //   const average = sum / ratings.length;
  //   return Math.round(average * 10) / 10;
  // }

  isAddedToCart(product: Product): boolean {
    return this.cartItems.some(item => item.id === product.id);
  }
  
  isProductInCart(product: Product, item: { id: string }): boolean {
    return item.id === product.id;
  }

  getTextDecorationStyle(product: Product): { [key: string]: string } {
    let textColor = '';
    let fontWeight = '';

    if (product.price < 15000) {
      textColor = 'green';
      fontWeight = 'bold';
    } else if (product.price >= 15000 && product.price < 25000) {
      textColor = 'orange';
      fontWeight = 'bold';
    } else {
      textColor = 'red';
      fontWeight = 'bold';
    }

    return {
      'color': textColor,
      'font-weight': fontWeight,
    };
  }
}