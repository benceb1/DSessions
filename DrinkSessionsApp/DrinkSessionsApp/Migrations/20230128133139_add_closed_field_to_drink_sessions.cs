using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DrinkSessionsApp.Migrations
{
    /// <inheritdoc />
    public partial class addclosedfieldtodrinksessions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Closed",
                table: "DrinkSessions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Closed",
                table: "DrinkSessions");
        }
    }
}
