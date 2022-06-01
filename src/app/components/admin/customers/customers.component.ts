import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  users : any ;
  filterTerm!: string;
  p: number = 1;
  filterTermm!: string;
  pp: number = 1;
  order_user : any ;
  user : any ;
  deleted : any;
  employee :any;
  constructor(private userService : UserService,
              private orderService : OrderService,
              private router:Router,
              private adminService : AdminService) { }

  ngOnInit(): void {
    this.getUser();
   
  }

  traitment(){
    for (let i = 0; i < this.users.length; i++) {  
      this.NumberOrder(this.users[i]);  
    }
  }
  getUser(){
    this.userService.getAllClients().subscribe(
      (data)=>{
        this.users = data.users;
        this.traitment();
      }
    )
  }

  NumberOrder(user :any){
    this.userService.NumberOfOrders(user._id).subscribe(
      (data)=>{
        user.nbr = data.number ;
        
      }
    )
  }

  getOrderById(id:any){
    this.orderService.UserOrderByID(id).subscribe(
      (data)=>{
        this.order_user = data.order;
        console.log('ooooo',this.order_user)
      }
    )
  }

  GetUserByEmail(email : any){
    this.userService.getUserByEmail(email).subscribe(
      (data)=>{
        this.user = data.user
        console.log('user',this.user);
        this. getOrderById(this.user._id);
      }
    )
  }

  EditUser(email : any){
    localStorage.setItem('edit_user', 'Admin');
    this.GetUserByEmail(email);
    this.router.navigate([`edit-user/${this.user._id}`])
  }



  Delete(email : any){

    this.userService.getUserByEmail(email).subscribe(
      (data)=>{
        this.deleted = data.user
        console.log('this.deleted',this.deleted);
       
      }
    )
  }

  DeleteUser(user:any){
   
    this.userService.deleteUser(user._id).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }

  viewProfil(id : any){
    this.router.navigate([`profile/${id}`]);
  }

  getIdUser(id: any){
    this.userService.getUserById(id).subscribe(
      (data)=>{
        this.employee = data.user ;
      }
    )
  }

  AddEmployee(user:any){
    this.adminService.AddEmployee(user).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }

  AddRedactor(user: any){
    this.adminService.AddRedactor(user).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }
}
