using DrinkSessionsApp.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrinkSessionsApp.Dtos
{
    public class ConsumptionUpdateDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public int Amount { get; set; } = 1;
        public int DrinkSessionId { get; set; }
        public int ProductId { get; set; }
    }
}
