using DrinkSessionsApp.Data.Interfaces;
using DrinkSessionsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DrinkSessionsApp.Data.ModelRepositories
{
    public class ConsumptionRepo : Repository<Consumption>, IConsumptionRepo
    {
        public ConsumptionRepo(DataContext context) : base(context)
        {
        }

        public override async Task<Consumption?> GetById(int id)
        {
            return await _context.Consumptions
                .Include(x => x.Product)
                .FirstOrDefaultAsync(x => x.Id == id);

        }
    }
}
