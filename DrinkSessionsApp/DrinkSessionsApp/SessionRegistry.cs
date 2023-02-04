using DrinkSessionsApp.Hubs;

namespace DrinkSessionsApp
{
    public class SessionRegistry
    {
        // key: sessionCode
        private readonly Dictionary<string, List<SessionUser>> _sessionUsers = new();

        public void JoinSession(string sessionCode, SessionUser sessionUser)
        {
            _sessionUsers[sessionCode].Add(sessionUser);
        }

        public void LeaveSession(string connectionId)
        {
            var sessionUserItem = _sessionUsers.Where(item =>
            {
                foreach (var user in item.Value)
                {
                    return user.ConnectionId == connectionId;
                }

                return false;
            }).FirstOrDefault();
        }

        public List<SessionUser> GetUsersBySessionCode(string code)
        {
            return _sessionUsers[code];
        }

        public List<string> GetSessionCodes()
        {
            return _sessionUsers.Keys.ToList();
        }

        public void CloseSession(string code)
        {
            _sessionUsers.Remove(code);
        }
    }
}
