import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-r-nav',
  templateUrl: './r-nav.component.html',
  styleUrls: ['./r-nav.component.css']
})
export class RNavComponent implements OnInit {
  id_user : any ;
  constructor(private router : Router) { }

  ngOnInit(): void {
    this.id_user  = localStorage.getItem("connectedUser");
  }

  logout(){
    localStorage.removeItem("connectedUser");
    this.router.navigate(['']);
  }
  setting(){
    localStorage.setItem("edit" , "R");
    this.router.navigate([`edit-user/${this.id_user}`])
  }
  profil(){
    this.router.navigate([`profile/${this.id_user}`]);
  }

}
