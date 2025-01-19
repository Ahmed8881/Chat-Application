using Microsoft.AspNetCore.SignalR;

namespace ChatApplication.Hub
{
    public class ChatHub:Microsoft.AspNetCore.SignalR.Hub
    {
        private readonly IDictionary<string, UserRoomConnection> _connection;
        public ChatHub(IDictionary<string, UserRoomConnection> connection)
        {
            _connection = connection;
        }
        public async Task JoinRoom(UserRoomConnection userconnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName:userconnection.Room!);
            _connection[Context.ConnectionId] = userconnection;

            await Clients.Group(userconnection.Room!).SendAsync(method: "RecieveMessage", arg1: "Lets Program Bot", arg2: $"{userconnection.User} has joined the group");
                

        }
        public async Task SendMessage(string message){
            if(_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userRoomConnection)){
                await Clients.Group(userRoomConnection.Room!).SendAsync(method:"RecieveMessage",userRoomConnection.User,message, DateTime.Now);
            }
        }
        public Task SendConnetedUsers(string room){
            var users = _connection.Values.Where(u=>u.Room==room).Select(s=>s.User);
            return Clients.Group(room).SendAsync(method:"ConnectedUsers",users);
        }
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            if(!_connection.TryGetValue(Context.ConnectionId, out UserRoomConnection userRoomConnection)){
                return base.OnDisconnectedAsync(exception);
            }   
            Clients.Group(userRoomConnection.Room!)
                .SendAsync(method:"RecieveMessage",arg1:"Lets Program Bot",arg2:$"{userRoomConnection.User} has left the group");
                SendConnetedUsers(userRoomConnection.Room!);
                return base.OnDisconnectedAsync(exception);
        }
    }
}
