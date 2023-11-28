import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;
  productChosen!: Product;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    // Not Async
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // Async
    this.productsService.getAllProducts()
                        .subscribe(data => {
      this.products = this.replaceImages(data);
      // console.log(data)
    })
  }

  onAddToShoppingCart(product: Product){
    // console.log(product)
    this.storeService.addProducto(product);

    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.productsService.getProductById(id)
                        .subscribe(data => {

                          data.images = [
                            'https://source.unsplash.com/random',
                            'https://source.unsplash.com/random'
                          ];

                          this.showProductDetail = true;
                          this.productChosen = data;
                        })
  }

  replaceImages(products: Product[]){

    products.every((product) => {
      product.images = [
        'https://source.unsplash.com/random',
        'https://source.unsplash.com/random'
      ];

      return product;
    })

    return products;
  }
}
