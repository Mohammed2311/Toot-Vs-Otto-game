using Microsoft.EntityFrameworkCore.Migrations;

namespace Game.Migrations
{
    public partial class mo1211 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Player2Name",
                table: "Players",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Player2Name",
                table: "Players");
        }
    }
}
