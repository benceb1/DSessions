using DrinkSessionsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DrinkSessionsApp.Data
{
    public class VenueRepo : Repository<Venue>, IVenueRepo
    {
        public VenueRepo(DataContext context) : base(context)
        {
        }
        
        public async Task<bool> Exists(int id)
        {
            return await _context.Venues.AnyAsync(x => x.Id == id);
        }

        public override async Task<IEnumerable<Venue>> GetAll()
        {
            return await _context.Venues!.Include(x => x.Products).ToListAsync();
        }

        public override async Task<Venue?> GetById(int id)
        {
            return await _context.Venues
                .Include(x => x.Products)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
