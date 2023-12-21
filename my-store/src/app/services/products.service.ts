import { Injectable } from '@angular/core';
import { 
  HttpClient, 
  HttpParams, 
  HttpErrorResponse, 
  HttpStatusCode 
} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { Product, CreateProductDTO, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment'
import { checkTime } from './../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
    // Url original
    // private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  // Para desarrollo se connfiguró proxy
  // private apiUrl = `/api/products`;

  // Para implementacion de ambientes
  private apiUrl = `${environment.API_URL}/api/products`;

  constructor(
    private http: HttpClient
  ) {}

  getAllProducts(limit?: number, offset?: number){
    let params = new HttpParams();

    if(limit !== null && offset !== null && limit !== undefined && offset !== undefined){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
      // console.log(`Limit: ${limit} Offset: ${offset} Params: ${params}`)
    }


    return this.http.get<Product[]>(this.apiUrl, {params, context: checkTime()})
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

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    // Usar zip cuando las peticiones no dependen de ellas pero se necesitan enviar al tiempo
    return zip(
      this.getProduct(id),
      this.update(id, dto)
    )
  }

  getProduct(id: string){
    // console.log(this.apiUrl);
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
