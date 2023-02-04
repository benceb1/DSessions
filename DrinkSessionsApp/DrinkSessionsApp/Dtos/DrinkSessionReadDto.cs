using DrinkSessionsApp.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DrinkSessionsApp.Dtos
{
    public class DrinkSessionReadDto
    {
        public int Id { get; set; }
        public int Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ClosedDate { get; set; }
        public bool Closed { get; set; } = false;
        public int? UserId { get; set; }
        public VenueDetailsReadDto? Venue { get; set; }
        public ICollection<ConsumptionReadDto>? Consumptions { get; set; }
    }
}
