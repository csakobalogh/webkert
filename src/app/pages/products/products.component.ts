import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../shared/models/Product';
import { CurrencyFormatPipe } from "../../shared/pipes/currency-format.pipe";
import { SizeFormatPipe } from "../../shared/pipes/size-format.pipe";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, CurrencyFormatPipe, SizeFormatPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: '1',
      name: 'Modern szőnyeg',
      description: 'Stílusos és puha, tökéletes a nappaliba.',
      size: '160x230',
      price: 19990,
      color: 'piros',
      material: 'juta/pamut',
      imageUrl: 'assets/carpet_1.jpg'
    },
    {
      id: '2',
      name: 'Perzsa szőnyeg',
      description: 'Klasszikus minta, prémium minőség.',
      size: '120x180',
      price: 24990,
      color: 'kék',
      material: 'juta/pamut',
      imageUrl: 'assets/carpet_2.jpg'
    },
    {
      id: '3',
      name: 'Skandináv szőnyeg',
      description: 'Egyszerű, minimalista dizájn skandináv stílusban.',
      size: '140x200',
      price: 17990,
      color: 'szürke',
      material: 'pamut',
      imageUrl: 'assets/carpet_3.jpg'
    },
    {
      id: '4',
      name: 'Gyerekszőnyeg',
      description: 'Vidám mintás szőnyeg a gyerekszobába.',
      size: '100x150',
      price: 12990,
      color: 'többszínű',
      material: 'poliészter',
      imageUrl: 'assets/carpet_4.jpg'
    },
    {
      id: '5',
      name: 'Vintage szőnyeg',
      description: 'Kopott hatású vintage stílusú szőnyeg.',
      size: '160x230',
      price: 21990,
      color: 'bézs',
      material: 'pamut',
      imageUrl: 'assets/carpet_5.jpg'
    },
    {
      id: '6',
      name: 'Shaggy szőnyeg',
      description: 'Extra puha, hosszú szálú shaggy szőnyeg.',
      size: '150x200',
      price: 26990,
      color: 'fehér',
      material: 'mikroszálas poliészter',
      imageUrl: 'assets/carpet_6.jpg'
    }
  ];  
}
