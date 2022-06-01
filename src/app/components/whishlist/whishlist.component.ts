import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  whish : any ;
  number : any ;
  id : any ;
  findedProduct : any ;
  constructor(private router : Router,
              private whishlistService : WhishlistService,
              private panierService : PanierService,
              private productService : ProductService) { }

  ngOnInit(): void {
    this.id  = localStorage.getItem("connectedUser");
    window.scroll(0,0);
    this.getAllWhishlist();
  }

  getAllWhishlist() {
    this.whishlistService.getWishesOfUser(this.id).subscribe(
      (data)=>{
        this.whish = data.wishes;
        this.number = data.number ;
      }
    )

  }


  SaveInPanier( panier:any){
    this.panierService.AddPanier(panier).subscribe(
      (data) => {
        console.log('Here data from BE after add user',data);
        // this.router.navigate(['whishlist']).then(() => {
          // window.location.reload();
        // });
        this.ngOnInit();
      
      }
    )
  }

  deleteWhish (produit : any) {
    console.log('here in delete product from whishlist ',produit);
    this.whishlistService.DeleteProductByID(produit).subscribe(
      (data)=>{
        this.ngOnInit();
      }
    )
  }

  viewProduct(id : any ){
    this.productService.getProductByName(id).subscribe(
      (data)=>{
        this.findedProduct = data.product
      }
    )
    console.log('Show Details of products :');
    this.router.navigate([`view-product/${this.findedProduct._id}`])
    .then(
      ()=>{
        this.ngOnInit();
        // window.location.reload();
      }
    )
  }
}
