import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees : any ;
  p: number = 1;
  filterTerm!: string;
  user : any ;
  constructor(private adminService : AdminService,
              private router : Router,
              private userService : UserService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.adminService.GetAllEmployees().subscribe(
      (data)=>{
        this.employees = data.employes
      }
    )
  }
  getIdUser(id: any){
    this.userService.getUserById(id).subscribe(
      (data)=>{
        this.user = data.user ;
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

  EditUser(id : any){
    localStorage.setItem('edit_user', 'E_admin');
    // this.GetUserByEmail(email);
    this.router.navigate([`edit-user/${id}`])
  }

  DeleteEmployee(user : any ){
    this.adminService.DeleteEmployee(user).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      
      }
    )
  }
}
