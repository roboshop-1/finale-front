import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisProduitService } from 'src/app/services/avis-produit.service';
import { PanierService } from 'src/app/services/panier.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { WhishlistService } from 'src/app/services/whishlist.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  produit: any;
  id_product: any;
  id_user: any;
  user: any;
  avisproForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    product: new FormControl(''),
    review: new FormControl(''),
    details: new FormControl(''),
    star: new FormControl('')
  });
  msg: String = "";
  avispro: any = {};
  ok: any;
  myDate: any;
  reviews: any;
  number_review: any;
  panier: any;
  new_solde: any;
  feed_msg: any;
  stars: any;
  list = new Array();
  add_cart_msg: any;
  msgError: String = "";
  constructor(private router: Router,
    private productService: ProductService,
    private WishlistService: WhishlistService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private avisproduitService: AvisProduitService,
    private whishlistService: WhishlistService,
    private panierService: PanierService
  ) { }

  ngOnInit(): void {
    this.avisproForm = this.formBuilder.group({
      name: [''],
      product: [''],
      review: [''],
      details: [''],
      star: ['']

    })

    window.scroll(0, 0);

    this.id_product = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id_product', this.id_product);
    this.getProduct();

    this.getReview(this.id_product);
    console.log("product", this.produit);
    console.log('this.review', this.reviews);

    // window.location.reload();

  }

  getUser(id: any) {
    console.log('Here In Get User In Profil');
    this.userService.getUserById(id).subscribe(
      (data) => {
        this.user = data.user;
        this.avispro.name = this.user.fname + " " + this.user.lname;
        console.log('this is user :', this.user);
      }
    )
  }


  getProduct() {
    console.log('Here in get Product From ID');
    this.productService.getProductById(this.id_product).subscribe(
      (data) => {
        console.log('here product :', data.product.quantity);
        this.produit = data.product

        if (this.produit.solde == true) {
          this.new_solde = this.produit.price - (this.produit.remise * this.produit.price) / 100;
        }
        this.getPanier(data.product);
        this.getProductByCategory(this.produit);
      }
    )

  }

  Addavispro() {
    this.id_user = localStorage.getItem("connectedUser");
    if (this.id_user == null) {
      this.router.navigate(['account']);
    }
    else {
      this.validData(this.avispro);
      console.log('this.ok', this.ok);
      if (this.ok == true) {
        this.getUser(this.id_user);
        this.avispro.product = this.produit._id;
        this.avispro.star = this.avisproForm.controls['star'].value;
        console.log('here in add review ', this.avispro);
        this.avisproduitService.AddAvisProduct(this.avispro).subscribe(
          (data) => {
            console.log(data.message);
            this.feed_msg = "Review Delivred !"
            this.ngOnInit();
          }
        )
      }
      else {
        console.log("error");
      }
    }

  }

  validData(review: any) {
    var valid: Boolean = true;
    console.log(review.review);
    if (review.review == undefined || review.review == "") {
      this.msg = "Your review is Required !"
      valid = false;
      this.ok = valid;
    }
    else if (review.details == undefined || review.details == "") {
      this.msg = "Details is Required !"
      valid = false;
      this.ok = valid;
    }
    this.ok = valid;
  }


  getReview(id: any) {
    console.log('here in get reviews of this product :', id);
    this.avisproduitService.getReviewProduct(id).subscribe(
      (data) => {

        this.reviews = data.review;
        this.stars = data.star;
        console.log('mmm', this.reviews);
        console.log('reviews', data.star, 'ghhgghg', data.nbr);
      }
    )


    this.avisproduitService.getNumber(id).subscribe(
      (data) => {
        this.number_review = data.number;
      }
    )
  }

  getPanier(panier: any) {
    console.log('product from get panier :', panier);
    this.panierService.getProductByID(panier).subscribe(
      (result) => {
        this.panier = result.pro;
        console.log('Get All Product In Bascket');
        console.log('mel pannier :', this.panier);
      }
    )
  }




  getDate() {
    this.myDate = new Date();
    console.log('test date function ok', this.myDate);
  }

  addWishlist(produit: any) {
    var id_user = localStorage.getItem("connectedUser");
    if (id_user == null) {
      this.router.navigate(['account']);
    }
    else {
      produit.user = id_user;
      console.log('Adding this product in Whislist :', produit);
      // this.produit.user = this.id_user;
      this.whishlistService.AddProduct(produit).subscribe(
        (data) => {
          console.log(data.message);
          // this.ngOnInit();
        }
      )
    }
  }

  SaveInPanier(produit: any) {

    var id_user = localStorage.getItem("connectedUser");
    if (id_user == null) {
      this.router.navigate(['account']);
    }
    else {
      produit.user = id_user;
      this.panierService.AddPanier(produit).subscribe(
        (data) => {
          console.log('Here data from BE after add product in panier', data);
        }
      )
    }
  }


  DeleteOne() {
    console.log(' panier', this.produit);
    this.panierService.deleteProductFromBasket(this.produit).subscribe(
      (data) => {
        this.ngOnInit();

      }
    )
  }

  getProductByCategory(product: any) {
    console.log('Here in get product by this category :', product);
    var id = product.categorie;
    this.productService.getProductByCategory(id).subscribe(
      (data) => {
        this.list = data.produit;
      }
    )

  }

  counter(i: number) {
    return new Array(i);
  }

  addCart(produit: any) {

    var id_user = localStorage.getItem("connectedUser");
    if (id_user == null) {
      this.router.navigate(['account']);
    }
    else {
      const typee = (<HTMLInputElement>document.getElementById('qty')).value;
      produit.stock = "In stock";
      produit.user = id_user;
      var type = Number(typee);
      console.log('typpee', type);
      if (produit.quantity <= type) {
        console.log('error');
        this.msgError = "Over Quantity !"
      }
      else {
        produit.quant = type;
        console.log('benda5loha fi bd ');
        this.panierService.AddCart(produit).subscribe(
          (data) => {
            this.add_cart_msg = "Added Successfuly !"
            console.log(data.message);
          }
        )
      }
    }

  }

  viewProduct(id: any) {
    console.log('Show Details of products :');
    this.router.navigate([`view-product/${id}`])
      .then(
        () => {
          this.ngOnInit();
          // window.location.reload();
        }
      )
  }


}
