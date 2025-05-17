import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { CartItem } from '../../shared/models/CartItem';
import { CartService } from '../../shared/services/cart.service';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CurrencyFormatPipe
],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  cartItems: CartItem[] = [];
  totalItems = 0;
  isLoading = true;

  private subscription: Subscription | null = null;

  constructor(private userService: UserService, private cartService: CartService) {}
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

async ngOnInit() {
    this.isLoading = true;

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User not logged in');

      this.user = await this.userService.getUserById(userId);

      this.cartService.getCartItems(userId).subscribe({
        next: (items) => {
          this.cartItems = items;
          this.totalItems = items.length;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Hiba a kosár betöltésekor:', error);
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Hiba a profil betöltésekor:', error);
      this.isLoading = false;
    }
  }

  getUserInitials(): string {
    if (!this.user?.name) return '?';

    const firstInitial = this.user.name.firstname?.charAt(0).toUpperCase() || '';
    const lastInitial = this.user.name.lastname?.charAt(0).toUpperCase() || '';

    return firstInitial + lastInitial;
  }
}
