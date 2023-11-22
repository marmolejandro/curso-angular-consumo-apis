import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];

  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProducto(producto: Product){
    this.myShoppingCart.push(producto);
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }

  getTotal(){
    // reduce((acumulado, item) => (logic operation), initValue)
    return this.myShoppingCart.reduce((sum, item) => (sum + item.price), 0);
  }
}
