using DrinkSessionsApp.Data.Interfaces;
using DrinkSessionsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DrinkSessionsApp.Data.ModelRepositories
{
    public class DrinkSessionRepo : Repository<DrinkSession>, IDrinkSessionRepo
    {
        public DrinkSessionRepo(DataContext context) : base(context)
        {

        }
            // include consumptions and venue
        public override async Task<DrinkSession?> GetById(int id)
        {
            return await _context.DrinkSessions
                .Include(x => x.Consumptions)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
