using DrinkSessionsApp.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DrinkSessionsApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
           
        }

        public DbSet<Venue> Venues { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DrinkSession> DrinkSessions { get; set; }
        public DbSet<Consumption> Consumptions { get; set; }
    }
}
