import { Component } from '@angular/core';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [ReactiveFormsModule],
  imports: [],
  templateUrl: './join-room.component.html',
  styleUrl: './join-room.component.scss'
})
export class JoinRoomComponent implements OnInit{
  joinRoomForm: FormGroup;
  fb = inject(FormBuilder);
  router.inject(Router);
  ngOnInit(): void{
    this.joinRoomForm = this.fb.group({
      user: ['', Validators.required],
      room: ['', Validators.required]
  })
  }
  joinRoom(){
    console.log(this.joinRoomForm.value);
    this.router.navigate(['/chat']);
  }  
}