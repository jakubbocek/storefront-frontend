import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    FormsModule,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router
  ) {}
  @ViewChild('paginator') paginator!: Paginator | undefined;

  products: Product[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = !this.displayEditPopup;
  }
  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }
  toggleAddPopup() {
    this.displayAddPopup = !this.displayAddPopup;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
    console.log(product, 'Edit product');
  }
  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
    console.log(product, 'Add product');
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output from ProductComponent');
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.error(error, 'Fetch products');
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data, 'Edit product');
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.error(error, 'Edit product');
        },
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data, 'Delete product');
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.error(error, 'Delete product');
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          console.log(data, 'Add product');
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.error(error, 'Add product');
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
