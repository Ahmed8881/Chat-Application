import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('pulse', [
      state('normal', style({ transform: 'scale(1)' })),
      state('pulsing', style({ transform: 'scale(1.05)' })),
      transition('normal <=> pulsing', animate('0.2s ease-in-out'))
    ])
  ]
})
export class JoinRoomComponent implements OnInit {
  joinRoomForm!: FormGroup;
  buttonState = 'normal';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.joinRoomForm = this.fb.group({
      user: ['', Validators.required],
      room: ['', Validators.required]
    });
  }

  joinRoom(): void {
    if (this.joinRoomForm.valid) {
      this.buttonState = 'pulsing';
      setTimeout(() => {
        this.buttonState = 'normal';
        this.router.navigate(['/chat']);
      }, 300);
    }
  }
}