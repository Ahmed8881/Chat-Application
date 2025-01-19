import { Routes } from '@angular/router';
// import {RouterModule, Routes} from '@angular/router';
import { JoinRoomComponent } from './join-room/join-room.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatComponent } from './chat/chat.component';
export const routes: Routes = [
  { path: '', redirectTo: 'join-room', pathMatch: 'full' },
  { path: 'join-room', component: JoinRoomComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'chat', component: ChatComponent },
];
