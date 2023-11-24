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
  @Output() showProduct = new EventEmitter<string>();

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }

  onShowDetails(){
    this.showProduct.emit(this.product.id);
  }
}
