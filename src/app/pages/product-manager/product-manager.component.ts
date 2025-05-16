import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/Product';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { inject } from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-manager',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
products$!: Observable<Product[]>;
private auth = inject(Auth);
isAdmin = false;

  newProduct: Omit<Product, 'id'> = {
    name: '',
    description: '',
    size: '',
    color: '',
    material: '',
    price: 0,
    imageUrl: '',
    ratings: []
  };

  editingProduct: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
     user(this.auth)
      .pipe(take(1))
      .subscribe(u => {
        const email = u?.email ?? '';
        this.isAdmin = email.includes('admin');
      });
    this.loadProducts();
  }

  loadProducts() {
    this.products$ = this.productService.getAllProducts();
  }

  async addProduct() {
    try {
      const added = await this.productService.addProduct(this.newProduct);
      console.log('Termék hozzáadva:', added);
      this.resetForm();
      this.loadProducts();
    } catch (error) {
      console.error('Hiba termék hozzáadásakor', error);
    }
  }

  async deleteProduct(id: string) {
    if (!confirm('Biztos törlöd a terméket?')) return;
    try {
      await this.productService.deleteProduct(id);
      console.log('Termék törölve:', id);
      this.loadProducts();
    } catch (error) {
      console.error('Hiba termék törlésekor', error);
    }
  }

  startEdit(product: Product) {
    this.editingProduct = { ...product };
  }

  async saveEdit() {
    if (!this.editingProduct) return;

    try {
      await this.productService.updateProduct(this.editingProduct.id, this.editingProduct);
      console.log('Termék frissítve:', this.editingProduct);
      this.editingProduct = null;
      this.loadProducts();
    } catch (error) {
      console.error('Hiba termék frissítéskor', error);
    }
  }

  // Szerkesztés megszakítása
  cancelEdit() {
    this.editingProduct = null;
  }

  resetForm() {
    this.newProduct = {
      name: '',
      description: '',
      size: '',
      color: '',
      material: '',
      price: 0,
      imageUrl: '',
      ratings: []
    };
  }
}
