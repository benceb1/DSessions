namespace DrinkSessionsApp.Dtos
{
    public class UserLoginSuccessDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Token { get; set; } = String.Empty;
    }
}
