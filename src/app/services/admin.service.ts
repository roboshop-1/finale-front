import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  AdminUrl: string = 'https://roboshopttn.herokuapp.com';
//   http://localhost:3001
  constructor(private httpClient: HttpClient) { }

  AddEmployee(user: any) {
    return this.httpClient.put<{ message: String }>(`${this.AdminUrl}/api/admin/add/employee/${user._id}`, user);
  }

  AddRedactor(user: any) {
    return this.httpClient.put<{ message: String }>(`${this.AdminUrl}/api/admin/add/redactor/${user._id}`, user);
  }

  GetAllEmployees(){
    return this.httpClient.get<{employes:any}>(`${this.AdminUrl}/api/admin/employees`);
  }

  GetAllRedactors(){
    return this.httpClient.get<{redactors:any}>(`${this.AdminUrl}/api/admin/Redactors`);
  }

  DeleteEmployee(user : any){
    return this.httpClient.put<{ message: String }>(`${this.AdminUrl}/api/admin/delete/employee/${user._id}`, user);
  }

}
