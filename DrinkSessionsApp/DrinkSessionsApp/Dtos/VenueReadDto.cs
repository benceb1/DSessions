using DrinkSessionsApp.Models;
using System.ComponentModel.DataAnnotations;

namespace DrinkSessionsApp.Dtos
{
    public class VenueReadDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public ICollection<ProductReadDto>? Products { get; set; }
    }
}
