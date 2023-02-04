using DrinkSessionsApp.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DrinkSessionsApp.Dtos
{
    public class DrinkSessionCreateDto
    {
        public int? Code { get; set; }
        public int? VenueId { get; set; }

        public int? UserId { get; set; }
    }
}
