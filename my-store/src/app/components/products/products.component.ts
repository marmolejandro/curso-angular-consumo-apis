import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
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
  limit = 10;
  offset = 0;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    // Not Async
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // Async
    // this.productsService.getAllProducts()
    // .subscribe(data => {
    //   this.products = this.replaceImages(data);
    // })

    // this.productsService.getProductsByPage(10, 0)
    // .subscribe(data => {
    //   this.products = this.replaceImages(data);
    //   this.offset += this.limit;
    // })

    this.httpGetProductsByPage();
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProducto(product);

    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){

    console.log(id);
    this.productsService.getProductById(id)
                        .subscribe(data => {

                          data.images = [
                            'https://source.unsplash.com/random',
                            'https://source.unsplash.com/random'
                          ];

                          this.productChosen = data;
                          this.showProductDetail = true;
                        })


  }

  createNewProduct(){

    const product: CreateProductDTO ={
      title: 'Nuevo producto',
      price: 1,
      images: [''],
      description: 'bla bla bla',
      categoryId: 1
    }
    this.productsService.create(product);
  }

  updateProduct(){

    const changes: UpdateProductDTO ={
      title: 'Nuevo title 2',
    }

    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe(data => {

      data.images = [
        'https://source.unsplash.com/random',
        'https://source.unsplash.com/random'
      ];

      const productIndex = this.products.findIndex(item => item.id == id);
      this.products[productIndex] = data;
    });
  }

  deleteProduct(){

    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {

      const productIndex = this.products.findIndex(item => item.id == id);
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    });

  }

  httpGetProductsByPage(){
    this.productsService.getAllProducts(this.limit, this.offset)
    .subscribe(data => {
      this.products = this.products.concat(this.replaceImages(data));
      this.offset += this.limit
    })
  }

  loadMore(){
    this.httpGetProductsByPage();
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
