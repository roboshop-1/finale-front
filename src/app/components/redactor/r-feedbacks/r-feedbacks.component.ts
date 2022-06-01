import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-r-feedbacks',
  templateUrl: './r-feedbacks.component.html',
  styleUrls: ['./r-feedbacks.component.css']
})
export class RFeedbacksComponent implements OnInit {

  feedbacks : any ;
  id_feedback : any ;
  p: number = 1;
  filterTerm!: string;
  feed : any ;
  message : any= {};
  msg : any ;
  ok : any ;
  MessageForm: FormGroup = new FormGroup({
    subject : new FormControl(''),
    message: new FormControl('')
  });

  constructor(private feedbackService : FeedbackService,
              private router : Router,
              private formBuilder : FormBuilder,
              private userService : UserService) { }

  ngOnInit(): void {

    this.MessageForm = this.formBuilder.group({
      subject: [''],
      message: [''],
    })



    this.getFeedback();
   
  }

  getFeedback(){
    this.feedbackService.getAllFeedbacks().subscribe(
      (data)=>{
        this.feedbacks = data.feedback;
      }
    )
  }

  getFeedbackId(id : any){
    this.id_feedback = id ;
  }

  getFeedbackIdd(id : any){
    this.feedbackService.GetFeedbackById(id).subscribe(
      (data)=>{
        this.feed = data.feedback;
      }
    )
  }

  DeleteFeedback(id : any){
    this.feedbackService.DeleteFeedback(id).subscribe(
      (data)=>{
        console.log(data.message);
        this.ngOnInit();
      }
    )
  }

  AddToHomePage(feedback : any){
    feedback.visibility = true ;
    this.feedbackService.AddToHomeList(feedback).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }

  DeleteFromHomePage(feedback :any){
    feedback.visibility = false;
    this.feedbackService.DeleteFromHomeList(feedback).subscribe(
      (data)=>{
        console.log(data.message);
      }
    )
  }

  // getIdUser(id: any , feed : any ){
    // this.userService.getUserByEmail(id).subscribe(
      // (data)=>{
        // this.user = data.user ;
        // this.user.feed = feed ;
        // console.log('hhh',this.user);
      // }
    // )
  // }
  Message(user : any){
    console.log('this is message',this.message);
    console.log(user);
    var new_user = user ;
    new_user.subject = this.message.subject ;
    new_user.message = this.message.message ;
    const v = this.validateMsg(this.message);
    if ( v == true){
    this.feedbackService.message(new_user).subscribe(
      (response: any) => {
        console.log('An e-mail was sent to' + user.email + 'Please check your mailbox.');
        console.log(response.msg);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
                 
    )
  }
  else {
    console.log('error');
  }
  }
  validateMsg(msge : any){
    var valide = true;
    // console.log(valide);
    if (msge.subject == undefined) {
      this.msg = "Subject is required !";
      valide = false;
      this.ok = valide;
    }
    else if (msge.message == undefined) {
      this.msg = "Message is required !";
      valide = false;
      this.ok = false;
    }
    else {
      valide = true;
    }
    return valide;
  }

 
 

}
