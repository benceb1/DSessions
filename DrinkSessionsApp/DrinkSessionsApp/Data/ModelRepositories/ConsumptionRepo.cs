using DrinkSessionsApp.Data.Interfaces;
using DrinkSessionsApp.Models;

namespace DrinkSessionsApp.Data.ModelRepositories
{
    public class ConsumptionRepo : Repository<Consumption>, IConsumptionRepo
    {
        public ConsumptionRepo(DataContext context) : base(context)
        {
        }
    }
}
