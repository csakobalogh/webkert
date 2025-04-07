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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
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
  
  products: Product[] = [
    {
      id: '1',
      name: 'Modern szőnyeg',
      description: 'Stílusos és puha, tökéletes a nappaliba.',
      size: '160x230',
      price: 19990,
      color: 'piros',
      material: 'juta/pamut',
      imageUrl: 'assets/carpet_1.jpg',
      ratings: [
        { value: 4 },
        { value: 4 },
        { value: 3 }
      ]
    },
    {
      id: '2',
      name: 'Perzsa szőnyeg',
      description: 'Klasszikus minta, prémium minőség.',
      size: '120x180',
      price: 24990,
      color: 'kék',
      material: 'juta/pamut',
      imageUrl: 'assets/carpet_2.jpg',
      ratings: [
        { value: 3 },
        { value: 2 },
        { value: 5 }
      ]
    },
    {
      id: '3',
      name: 'Skandináv szőnyeg',
      description: 'Egyszerű, minimalista dizájn skandináv stílusban.',
      size: '140x200',
      price: 17990,
      color: 'szürke',
      material: 'pamut',
      imageUrl: 'assets/carpet_3.jpg',
      ratings: [
        { value: 3 },
        { value: 4 },
        { value: 5 }
      ]
    },
    {
      id: '4',
      name: 'Gyerekszőnyeg',
      description: 'Vidám mintás szőnyeg a gyerekszobába.',
      size: '100x150',
      price: 12990,
      color: 'többszínű',
      material: 'poliészter',
      imageUrl: 'assets/carpet_4.jpg',
      ratings: [
        { value: 5 },
        { value: 4 },
        { value: 1 }
      ]
    },
    {
      id: '5',
      name: 'Vintage szőnyeg',
      description: 'Kopott hatású vintage stílusú szőnyeg.',
      size: '160x230',
      price: 21990,
      color: 'bézs',
      material: 'pamut',
      imageUrl: 'assets/carpet_5.jpg',
      ratings: [
        { value: 2 },
        { value: 4 },
        { value: 1 }
      ]
    },
    {
      id: '6',
      name: 'Shaggy szőnyeg',
      description: 'Extra puha, hosszú szálú shaggy szőnyeg.',
      size: '150x200',
      price: 26990,
      color: 'fehér',
      material: 'mikroszálas poliészter',
      imageUrl: 'assets/carpet_6.jpg',
      ratings: [
        { value: 3 },
        { value: 4 },
        { value: 3 }
      ]
    }
  ];  
}
