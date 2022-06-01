import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { WhishlistService } from 'src/app/services/whishlist.service';
import { PanierService } from 'src/app/services/panier.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  product : any ;
  produit_b : Boolean = true ;
  categorie : any ;
  produit : any ;
  id_user : any ;
  constructor(private productService : ProductService,
              private router : Router,
              private categoryService : CategoryService,
              private wishlistService : WhishlistService,
              private panierService : PanierService
              ) { }

  ngOnInit(): void {
    this.id_user = localStorage.getItem("connectedUser");
    this.getProduct();
    this.GetCategory();
    window.scroll(0,0);
  }

  getProduct(){
    this.produit = null ;

    this.productService.getProductHome().subscribe(
      (data)=>{
        this.product = data.produit ;
      }
    )
  }

  GetCategory(){
    this.categoryService.allCategory().subscribe(
      (data)=>{
        this.categorie = data.category ;
      }
    )
  }

  getProductByCategorie(categorie : any){
    this.product = null ;
    this.produit_b = false ;
    this.productService.getProductCategoryHome(categorie).subscribe(
      (data)=>{
        this.produit = data.produit ;
      }
    )
  }

  addWishlist(produit : any ) {
    produit.user = this.id_user;
    console.log('Adding this product in Whislist :', produit);
    this.wishlistService.AddProduct(produit).subscribe(
      (data) => {
        console.log(data.message);
      }
    )
  }
  SaveInPanier(produit : any ) {
    produit.user = this.id_user ;
    this.panierService.AddPanier(produit).subscribe(
    (data) => {
    console.log('Here data from BE after add product in panier',data);
      }
    )
  }
  viewProduct(id : any ){
    console.log('Show Details of products :');
    this.router.navigate([`view-product/${id}`])
    // .then(
      // ()=>{
        // this.ngOnInit();
        // window.location.reload();
      // }
    // )
  }

}
