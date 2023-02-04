using DrinkSessionsApp.Models;

namespace DrinkSessionsApp.Hubs
{
    public enum Status { OK, ERROR }
    public record JoinRequest(string Code, string Name);

    public record JoinResponse(Status Status, List<Consumption> Consumptions);

    public record SessionUser(string ConnectionId, string Name);


}
