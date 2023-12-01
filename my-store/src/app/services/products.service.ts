import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  // private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  constructor(
    private http: HttpClient
  ) {}

  getAllProducts(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductById(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(this.apiUrl, dto)
    .subscribe(data => {
      console.log('created: ', data);
    });
  }

  update(id: string, dto: UpdateProductDTO){
    // Patch -> Se envía información parcial
    // Put -> Se envía toda la información
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
