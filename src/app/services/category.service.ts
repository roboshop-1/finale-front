import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl: string = 'https://roboshopttn.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  AddCategory(category:any) {
    return this.httpClient.post<{message:any}>(`${this.categoryUrl}/api/category/add`,category);
  }

  allCategory(){
    return this.httpClient.get<{category:any,nbr :any}>(`${this.categoryUrl}/api/category/all`);
  }

  GetCategory(category : any){
    return this.httpClient.get<{category:any}>(`${this.categoryUrl}/api/category/get/${category}`);
  }

  GetNumberProduct(category : any){
    return this.httpClient.get<{number:any}>(`${this.categoryUrl}/api/category/number/${category}`);
  }

  GetPayment(category : any){
    return this.httpClient.get<{number:any}>(`${this.categoryUrl}/api/category/payment/${category}`);
  }

}
