import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {

  trend_products : any ;
  id_user: any ;
  constructor(private productService : ProductService,
              private panierService : PanierService,
              private wishlistService : WhishlistService,
              private router : Router) { }

  ngOnInit(): void {
   
    this.getTrend();
  }

  getTrend(){
    this.productService.gettrends().subscribe(
      (data)=>{
        this.trend_products = data.trend ;
        console.log('trends : ', this.trend_products);
      }
    )
  }

  SaveInPanier(produit : any ) {
    var id_user = localStorage.getItem("connectedUser");
    if (id_user == null) {
      this.router.navigate(['account']);
    }
    else{
      produit.user = id_user ;
      this.panierService.AddPanier(produit).subscribe(
      (data) => {
      console.log('Here data from BE after add product in panier',data);
      }
    )
    }
}

addWishlist(produit : any ) {
  var id_user = localStorage.getItem("connectedUser");
  if (id_user == null) {
    this.router.navigate(['account']);
  }
  else{
    produit.user = id_user;
    console.log('Adding this product in Whislist :', produit);
    this.wishlistService.AddProduct(produit).subscribe(
      (data) => {
        console.log(data.message);
      
      }
    )
  }
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
