using DrinkSessionsApp.Models;

namespace DrinkSessionsApp.Data
{
    public interface IVenueRepo : IRepository<Venue>
    {
        Task<bool> Exists(int id);
    }
}
