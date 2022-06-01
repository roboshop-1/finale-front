import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {
  filterTerm!: string;
  product : any ;
  category: any ;
  constructor(private productService : ProductService,
            private categoryService : CategoryService,
            private router : Router) { }

  ngOnInit(): void {
    this.  getAllProduct();
    this.GetAllCategory();
  }

  getAllProduct(){
    console.log('here in get all product ');
    this.productService.getAllproducts().subscribe(
      (data)=>{
        this.product = data.products;
        console.log('all products',this.product);
      }
    )
  }

  GetAllCategory(){
    console.log('here in get all categorys');
    this.categoryService.allCategory().subscribe(
      (data)=>{
        this.category = data.category ;
      }
    )
  }
  User(){
    const user  = localStorage.getItem("connectedUser");
    if (user == null){
      this.router.navigate(['account']);
    }
    else{
      console.log('this is user id :', user);
      this.router.navigate([`profile/${user}`]);
    }
  }

}
