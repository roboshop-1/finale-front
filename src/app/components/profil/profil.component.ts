import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PanierService } from 'src/app/services/panier.service';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user:any;
  id:any;
  id_user : any ;
  panier : any ;
  price : any ;
  number : any;
  constructor(private userService:UserService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private panierService: PanierService,
              private productService : ProductService
              ) { }

  ngOnInit(): void {
  //  const id  = localStorage.getItem("connectedUser");
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.getUser(this.id);
  // console.log('Here In Get User In Profil');
  // this.userService.getUserById(this.id).subscribe(
    // (data)=>{
      // this.user = data.user;
    // }
  // )
  window.scroll(0,0);
  this.AllProduct();
  this.getPrices();
  }

  getUser(id : any){
    console.log('Here In Get User In Profil');
    this.userService.getUserById(id).subscribe(
      (data)=>{
        this.user = data.user;
        console.log('this is user :',this.user);
      }
    )

  }
  
  AllProduct() {
    this.id_user = localStorage.getItem("connectedUser");
    this.panierService.getAllproduct(this.id).subscribe(
      (result) => {
        this.panier = result.panier;
        console.log('Get All Product In Bascket', this.panier);
      }
    )
  }

  getPrices() {
    this.panierService.TotalPrice(this.id).subscribe(
      (data) => {
        this.number = data.nbr;
        this.price = data.prices;
        console.log(this.number);
      }
    )
  }

  EditUser(id : any){
    localStorage.setItem('edit_user', 'Profile');
    this.router.navigate([`edit-user/${id}`])
  }


  Logout(){
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }

  viewProduct(name : any){
    this.productService.getProductByName(name).subscribe(
      (data)=>{
        this.router.navigate([`view-product/${data.product._id}`])
      }
    )
  }

}
