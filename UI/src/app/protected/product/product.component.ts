import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/product.model';
import { ProductService } from '../common/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  searchTerm: string = ''; 
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      console.log('Product Names:');
      data.forEach((product) => {
        console.log(data)
        if (product.name !== undefined) {
          console.log(product.name);
        } else {
          console.log('undefined');
        }
      });
    });
  } 

  itemsPerPage = 8;
  currentPage = 1;

  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  get filteredProducts(): any[] {
    return this.products.filter(product =>
      product.type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  applyFilter(): void {
    console.log('Applying filter:', this.searchTerm);
    console.log('Filtered products:', this.filteredProducts);
    this.currentPage = 1; // Reset to the first page when a new search term is applied
  }
  

}
