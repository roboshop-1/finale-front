import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-redactor',
  templateUrl: './redactor.component.html',
  styleUrls: ['./redactor.component.css']
})
export class RedactorComponent implements OnInit {
  user : any ;
  redactors : any ;
  p: number = 1;
  filterTerm!: string;
  constructor(private adminService : AdminService,
              private userService : UserService,
              private router : Router ) { }

  ngOnInit(): void {
    this.getRedactors();
  }


  getRedactors(){
    this.adminService.GetAllRedactors().subscribe(
      (data)=>{
        this.redactors = data.redactors
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
