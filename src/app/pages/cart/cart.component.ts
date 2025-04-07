import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CartItem } from '../../shared/models/CartItem';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";

@Component({
  selector: 'app-cart',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyFormatPipe
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    const cartItems = localStorage.getItem('cartItems');
    this.cartItems = cartItems ? JSON.parse(cartItems) : [];
    this.calculateTotal();
  }

  calculateTotal(): void {
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum += this.cartItems[i].price;
    }
    this.totalAmount = sum;
  }  

  removeItem(itemId: string): void {
    const updatedCart = [];
    for (let i = 0; i < this.cartItems.length; i++) {
      const item = this.cartItems[i];
      if (item.id !== itemId) {
        updatedCart.push(item);
      }
    }
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    this.loadCart();
  }

  clearCart(): void {
    localStorage.removeItem('cartItems');
    this.loadCart();
  }
}
