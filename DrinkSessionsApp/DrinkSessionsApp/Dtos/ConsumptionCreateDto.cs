using DrinkSessionsApp.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DrinkSessionsApp.Dtos
{
    public class ConsumptionCreateDto
    {
        public string Username { get; set; } = string.Empty;
        public int Amount { get; set; }
        public int? DrinkSessionId { get; set; }
        public int? ProductId { get; set; }
    }
}
