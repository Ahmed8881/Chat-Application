import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import{ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './join-room.component.html',
  
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {
constructor(
  private fb: FormBuilder,
  private router: Router,
  private _chatService: ChatService
) {

}


  joinRoomForm!: FormGroup;


  ngOnInit(): void {

    this.joinRoomForm = this.fb.group({
      user: ['', Validators.required],
      room: ['', Validators.required]
    });
  }

  joinRoom(){
    debugger;
    const {user, room} = this.joinRoomForm.value;
    sessionStorage.setItem("user", user);
    sessionStorage.setItem("room", room);
    this._chatService.joinRoom(user, room)
    .then(()=>{

  }).catch((err)=>{
    console.log(err);
  })
  this.router.navigate(['chat']);

  }

}