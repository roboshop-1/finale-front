import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {  
  wishlistUrl: string = 'https://roboshopttn.herokuapp.com';

  // http://192.168.1.2:82

  constructor(private httpClient: HttpClient) { }

  getAllProduct(){
    return this.httpClient.get<{whishlist:any, nbr : any}>(`${this.wishlistUrl}/api/whish/whishlist`);
  }

  getWishesOfUser(id:any){
    return this.httpClient.get<{number : any , wishes : any}>(`${this.wishlistUrl}/api/whish/whishlist/${id}`);

  }

  DeleteProduct(id:any){
    return this.httpClient.delete<{message:any}>(`${this.wishlistUrl}/api/whish/delete/product/${id}`);
   }
     
  AddProduct(whish:any) {
  return this.httpClient.post<{message:any}>(`${this.wishlistUrl}/api/whish/product/add`,whish);
 }

 GetNumberWish(id : any){
  return this.httpClient.get<{number : any }>(`${this.wishlistUrl}/api/whish/number/${id}`);

 }

 deblicated(){
  return this.httpClient.get<{wish : any }>(`${this.wishlistUrl}/api/whish/deblicate`);

 }

 SortedProduct(product : any){
  return this.httpClient.put<{products:any}>(`${this.wishlistUrl}/api/whish/sorted/${product._id}`,product);
 }

 GetInformation(wish : any){
  return this.httpClient.get<{wish : any }>(`${this.wishlistUrl}/api/whish/information/${wish}`);
 }

 DeleteProductByID(produit:any){
  return this.httpClient.post<{message:any}>(`${this.wishlistUrl}/api/whish/delete`,produit);
 }
}
