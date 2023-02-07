using DrinkSessionsApp.Hubs;

namespace DrinkSessionsApp
{
    public class SessionRegistry
    {
        // key: sessionCode
        private readonly List<SessionUser> _sessionUsers = new();

        public Func<string, Task>? NotifyClosedConnections { get; set; }

        public void JoinSession(SessionUser sessionUser)
        {
            _sessionUsers.Add(sessionUser);
        }

        public void LeaveSession(string connectionId)
        {
            _sessionUsers.RemoveAll(x => x.ConnectionId == connectionId);
        }

        public List<SessionUser> GetUsersBySessionCode(string code)
        {
            return _sessionUsers.Where(x => x.SessionCode == code).ToList();   
        }

        public SessionUser? GetUserByConnectionId(string connectionId)
        {
            return _sessionUsers.Where(x => x.ConnectionId == connectionId).FirstOrDefault();
        }

        public List<string> GetSessionCodes()
        {
            return _sessionUsers.Select(x => x.SessionCode).Distinct().ToList();
        }

        public void CloseSession(string code)
        {
            _sessionUsers.RemoveAll(x => x.SessionCode == code);
        }

        public bool SessionContainsUserName(string code, string username)
        {
            return _sessionUsers.Any(x => x.SessionCode == code && x.Name == username);
        }
    }
}
