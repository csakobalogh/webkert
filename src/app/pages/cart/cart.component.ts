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
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  removeItem(itemId: string): void {
    const updatedCart = this.cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    this.loadCart();
  }

  clearCart(): void {
    localStorage.removeItem('cartItems');
    this.loadCart();
  }
}
