using DrinkSessionsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DrinkSessionsApp.Data
{
    public class UserRepo : Repository<User>, IUserRepo
    {
        public UserRepo(DataContext context) : base(context)
        {
        }
    }
}
