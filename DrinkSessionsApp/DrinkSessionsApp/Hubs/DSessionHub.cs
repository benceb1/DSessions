using AutoMapper;
using DrinkSessionsApp.Data.Interfaces;
using DrinkSessionsApp.Dtos;
using DrinkSessionsApp.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace DrinkSessionsApp.Hubs
{
    public class DSessionHub : Hub
    {
        private readonly IConsumptionRepo _consumptionRepo;
        private readonly SessionRegistry _sessionRegistry;
        private readonly IMapper _mapper;

        public DSessionHub(IConsumptionRepo consumptionRepo, SessionRegistry sessionRegistry, IMapper mapper)
        {
            _consumptionRepo = consumptionRepo;
            _sessionRegistry = sessionRegistry;
            _mapper = mapper;
        }

        public async Task<ICollection<ConsumptionReadDto>> JoinSession(JoinRequest request)
        {
            var sessionUsernameExists = _sessionRegistry.SessionContainsUserName(request.Code, request.Name);
            
            if (sessionUsernameExists)
            {
                return new List<ConsumptionReadDto>();
            }

            var consumptions = await _consumptionRepo.GetAll()
                .Where(x => x.DrinkSession!.Code == int.Parse(request.Code))
                .Include(x => x.Product)
                .ToListAsync();

            await Groups.AddToGroupAsync(Context.ConnectionId, request.Code.ToString());
            _sessionRegistry.JoinSession(new SessionUser(Context.ConnectionId, request.Name, request.Code));

            return _mapper.Map<ICollection<ConsumptionReadDto>>(consumptions);
        }

        public async Task<Task?> AddConsumption(ConsumptionCreateDto createDto)
        {
            var consumption = _mapper.Map<Consumption>(createDto);
            await _consumptionRepo.Create(consumption);

            consumption = await _consumptionRepo.GetById(consumption.Id);
            var sessionUser = _sessionRegistry.GetUserByConnectionId(Context.ConnectionId);

            if (sessionUser == null)
            {
                return null;
            }

            return Clients.Group(sessionUser.SessionCode)
                .SendAsync("consumption_added", _mapper.Map<ConsumptionReadDto>(consumption));
        }

        public async Task<Task?> ChangeAmount(ConsumptionUpdateDto updateDto)
        {
            var consumption = await _consumptionRepo.GetById(updateDto.Id);
            consumption!.Amount = updateDto.Amount;
            await _consumptionRepo.Update(consumption);

            var sessionUser = _sessionRegistry.GetUserByConnectionId(Context.ConnectionId);

            if (sessionUser == null)
            {
                return null;
            }

            return Clients.Group(sessionUser.SessionCode)
                .SendAsync("amount_changed", _mapper.Map<ConsumptionReadDto>(consumption));
        }

        public Task CloseSession(string sessionCode)
        {
            _sessionRegistry.CloseSession(sessionCode);

            return Clients.Group(sessionCode).SendAsync("session_closed");
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            Debug.WriteLine("hehe leléptem");
            _sessionRegistry.LeaveSession(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
