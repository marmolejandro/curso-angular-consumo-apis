import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  private apiUrl = `${environment.API_URL}/api/products`;
  // private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  constructor(
    private http: HttpClient
  ) {}

  getAllProducts(limit?: number, offset?: number){

    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(this.apiUrl, {params})
    .pipe(
      retry(3)
    );
  }

  getProductById(id: string){
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // getProductsByPage(limit: number, offset: number){
  //   return this.http.get<Product[]>(`${this.apiUrl}`, {
  //     params: {limit, offset}
  //   })
  // }

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
