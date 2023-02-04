using DrinkSessionsApp.Data.Interfaces;
using DrinkSessionsApp.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace DrinkSessionsApp.Hubs
{
    public class DSessionHub : Hub
    {
        private readonly IDrinkSessionRepo _drinkSessionRepo;
        private readonly SessionRegistry _sessionRegistry;

        public DSessionHub(IDrinkSessionRepo drinkSessionRepo, SessionRegistry sessionRegistry)
        {
            _drinkSessionRepo = drinkSessionRepo;
            _sessionRegistry = sessionRegistry;
        }

        public async Task<JoinResponse> JoinSession(JoinRequest request)
        {
            var sessionUsernameExists = _sessionRegistry.GetUsersBySessionCode(request.Code).Where(u => u.Name == request.Name);

            if (sessionUsernameExists != null)
            {
                return new JoinResponse(Status.ERROR, new List<Consumption>());
            }

            var session = await _drinkSessionRepo
                .GetAll()
                .Where(s => s.Code == int.Parse(request.Code) && s.Closed == false)
                .Include(s => s.Consumptions)
                .FirstOrDefaultAsync();

            if (session == null)
            {
                return new JoinResponse(Status.ERROR, new List<Consumption>());
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, request.Code.ToString());
            _sessionRegistry.JoinSession(request.Code, new SessionUser(Context.ConnectionId, request.Name));

            return new JoinResponse(Status.OK, session.Consumptions!.ToList());
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            Debug.WriteLine("hehe leléptem");
            _sessionRegistry.LeaveSession(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

    }

    // records
    

    
}
