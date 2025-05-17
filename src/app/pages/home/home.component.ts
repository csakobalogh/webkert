import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  cheapRugs: Product[] = [];
  topRatedRugs: Product[] = [];
  colorFilteredRugs: Product[] = [];
  midRangeRugs: Product[] = [];

  availableColors: string[] = ['piros', 'zöld', 'kék', 'barna', 'szürke'];
  selectedColor: string = '';

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loadCheapRugs();
    this.loadTopRatedRugs();
    this.loadMidRangeRugs();
  }

  onColorChange(): void {
    if (!this.selectedColor) {
      this.colorFilteredRugs = [];
      return;
    }

    this.productService.getProductsByColorSortedByPrice(this.selectedColor)
      .subscribe(rugs => this.colorFilteredRugs = rugs);
  }

  loadCheapRugs(): void {
    this.productService.getCheapRugs(5).subscribe(products => {
      this.cheapRugs = products;
    });
  }

  loadTopRatedRugs(): void {
    this.productService.getTopRatedRugs().subscribe(products => {
      this.topRatedRugs = products;
    });
  }

  loadMidRangeRugs(): void {
    this.productService.getMidRangeRugs().subscribe(products => {
      this.midRangeRugs = products;
    });
  }
}