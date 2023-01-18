using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrinkSessionsApp.Models
{
    public class Product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public int Price { get; set; }

        [ForeignKey("VenueId")]
        public virtual Venue? Venue { get; set; }
        public int? VenueId { get; set; }

        public ICollection<Consumption>? Consumptions { get; set; }
    }
}
