import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  // Removed now that we are using routing
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

  //Using OnInit lifecycle hook
export class ProductListComponent implements OnInit {
  pageTitle: string = "Josh's Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  // filtered product array
  filteredProducts: IProduct[];
  // Using a IProduct interface
  products: IProduct[] = [];

  // constructor is executed when component is first initialized
  constructor(private productService: ProductService) {
    
    //this.listFilter = 'cart';
  }


  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }


  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }


  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
    error => this.errorMessage = <any>error
    );
    this.filteredProducts = this.products;
  }

}
