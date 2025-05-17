import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/Product';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  cheapRugs: Product[] = [];
  topRatedRugs: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.loadCheapRugs();
    this.loadTopRatedRugs();
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
}