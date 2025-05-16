import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CartItem } from '../../shared/models/CartItem';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";
import { CartService } from '../../shared/services/cart.service';

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
  userId: string | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.loadCart();
  }

  loadCart(): void {
   if (!this.userId) {
      this.cartItems = [];
      this.totalAmount = 0;
      return;
    }

    this.cartService.getCartItems(this.userId).subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    let sum = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      sum += this.cartItems[i].price;
    }
    this.totalAmount = sum;
  }  

  async removeItem(itemId: string): Promise<void> {
    if (!this.userId) return;

    await this.cartService.removeFromCart(this.userId, itemId);
    this.loadCart();
  }

  async clearCart(): Promise<void> {
    if (!this.userId) return;
    await this.cartService.clearCart(this.userId);
    this.loadCart();
  }
}
