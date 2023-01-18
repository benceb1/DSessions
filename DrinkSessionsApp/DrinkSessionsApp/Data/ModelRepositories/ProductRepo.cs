using DrinkSessionsApp.Models;
using Microsoft.EntityFrameworkCore;

namespace DrinkSessionsApp.Data
{
    public class ProductRepo : Repository<Product>, IProductRepo
    {
        public ProductRepo(DataContext context) : base(context)
        {

        }
    }
}
