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
  isLoggedIn = false;
  products: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl
    };

    const existingCart = localStorage.getItem('cartItems');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];

    if (!cartItems.some((item: { id: string; }) => item.id === cartItem.id)) {
      cartItems.push(cartItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.router.navigate(['/cart']);
  }

  getAverageRating(ratings: Rating[]): number {
    if (ratings.length === 0) return 0;
  
    let sum = 0;
    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i].value;
    }
  
    const average = sum / ratings.length;
    return Math.round(average * 10) / 10;
  }

  isAddedToCart(product: Product): boolean {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.some(this.isProductInCart.bind(this, product));
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