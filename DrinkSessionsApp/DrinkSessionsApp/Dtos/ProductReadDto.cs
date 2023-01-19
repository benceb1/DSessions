using DrinkSessionsApp.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DrinkSessionsApp.Dtos
{
    public class ProductReadDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Icon { get; set; }
        public int? Price { get; set; }
    }
}
