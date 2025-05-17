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
  hasSearchedByColor: boolean = false;
  availableColors: string[] = ['piros', 'zöld', 'kék', 'barna', 'szürke'];
  selectedColor: string = '';

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loadCheapRugs();
    this.loadTopRatedRugs();
    this.loadMidRangeRugs();
  }

  onColorSubmit(): void {
    this.hasSearchedByColor = true;

    if (this.selectedColor) {
      this.productService.getProductsByColorSortedByPrice(this.selectedColor).subscribe(products => {
        this.colorFilteredRugs = products;
      });
    } else {
      this.colorFilteredRugs = [];
    }
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