import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-nav',
  templateUrl: './e-nav.component.html',
  styleUrls: ['./e-nav.component.css']
})
export class ENavComponent implements OnInit {

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
    localStorage.setItem("edit" , "E");
    this.router.navigate([`edit-user/${this.id_user}`])
  }
  profil(){
    this.router.navigate([`profile/${this.id_user}`]);
  }

}
