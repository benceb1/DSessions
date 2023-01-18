using DrinkSessionsApp.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DrinkSessionsApp.Dtos
{
    public class ProductCreateDto
    {
        public string? Name { get; set; }
        public int? Price { get; set; }

        public int VenueId { get; set; }
    }
}
