using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrinkSessionsApp.Models
{
    public class Venue
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; } = String.Empty;

        public ICollection<Product>? Products { get; set; }

        public ICollection<DrinkSession>? DrinkSessions { get; set; }
    }
}
