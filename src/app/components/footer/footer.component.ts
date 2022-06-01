import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private userService:UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  User(){
    const user  = localStorage.getItem("connectedUser");
    if (user == null){
      this.router.navigate(['account']);
    }
    else{
      console.log('this is user id :', user);
      this.router.navigate([`profile/${user}`]);
    }
  }

}
