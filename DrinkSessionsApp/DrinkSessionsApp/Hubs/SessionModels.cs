namespace DrinkSessionsApp.Hubs
{
    public record JoinRequest(string Code, string Name);
    public record SessionUser(string ConnectionId, string Name, string SessionCode);
}
