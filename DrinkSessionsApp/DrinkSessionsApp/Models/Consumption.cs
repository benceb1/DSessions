using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrinkSessionsApp.Models
{
    public class Consumption
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;

        [ForeignKey("DrinkSessionId")]
        public virtual DrinkSession? DrinkSession { get; set; }
        public int? DrinkSessionId { get; set; }

        [ForeignKey("ProductId")]
        public virtual Product ?Product { get; set; }
        public int? ProductId { get; set; }
        
    }
}
