import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input('myProduct') product!: Product;
  @Output() addedProduct = new EventEmitter<Product>();

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }
}
