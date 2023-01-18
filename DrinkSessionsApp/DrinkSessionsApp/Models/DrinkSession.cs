using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrinkSessionsApp.Models
{
    public class DrinkSession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int Code { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ClosedDate { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
        public int? UserId { get; set; }

        [ForeignKey("VenueId")]
        public virtual Venue? Venue { get; set; }
        public int? VenueId { get; set; }

        public ICollection<Consumption>? Consumptions { get; set; }
    }
}
