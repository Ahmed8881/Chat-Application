import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
public connection :signalR.HubConnection = new signalR.HubConnectionBuilder()
.withUrl('https://localhost:5000/chat')
.configureLogging(signalR.LogLevel.Information)
.build();
  constructor() {
    this.connection.on('ReceiveMessage',(user:string,message:string,messageTime:string)=>{
      console.log("User",user);
      console.log("Message",message);
      console.log("Time",messageTime);
    });
    this.connection.on('ConnectedUsers',(users:any)=>{
      console.log("users",users);
    });

   }
  //start connection
  public async startConnection(){
    try {
      await this.connection.start();
      console.log('connected');
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        this.startConnection();
      }, 5000);
    }
  }
  //join room
  public async joinRoom(user:string,room:string){
    try {
      await this.connection.invoke('JoinRoom',{user,room});
    } catch (error) {
      console.log(error);
    }
  }
  //send message
  public async sendMessage(message:string){
    try {
      await this.connection.invoke('SendMessage',message);
    } catch (error) {
      console.log(error);
    }
  }
  //leave chat
  public async leaveChat(){
   return this.connection.stop();
  }
}