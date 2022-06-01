import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-r-products',
  templateUrl: './r-products.component.html',
  styleUrls: ['./r-products.component.css']
})
export class RProductsComponent implements OnInit {



  filterTerm!: string;
  p: number = 1;
  products : any ;
  constructor(private productService :ProductService,
              private router : Router) { }

  ngOnInit(): void {
    this.GetAllProducts();
  }


  GetAllProducts(){
    this.productService.getAllproducts().subscribe(
      (data)=>{
        this.products = data.products;
      }
    )
  }
  viewProduct(id : any ){
    console.log('Show Details of products :');
    this.router.navigate([`view-product/${id}`]).then(
      ()=>{
        this.ngOnInit();
        window.location.reload();
      }
    )
  }


}
