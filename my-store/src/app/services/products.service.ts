import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Para desarrollo se connfiguró proxy
  // private apiUrl = `/api/products`;

  // Para implementacion de ambientes
  private apiUrl = `${environment.API_URL}/api/products`;

  // Url original
  // private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

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
      retry(3),
      map(products => products.map(item => {
          return {
            ...item,
            taxes: .19 * item.price
          }
        })
      )
    );
  }

  getProduct(id: string){

    console.log(this.apiUrl);
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError('Algo está fallando en el server');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError('El producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError('No estas permitido');
        }
        return throwError('Ups algo salió mal');
      })
    );
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
