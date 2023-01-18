using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DrinkSessionsApp.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; } = String.Empty;

        public string Password { get; set; } = String.Empty;

        public string PasswordSalt { get; set; } = String.Empty;

        public ICollection<DrinkSession>? DrinkSessions { get; set; }
    }
}
