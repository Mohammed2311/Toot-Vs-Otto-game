using Microsoft.EntityFrameworkCore.Migrations;

namespace Game.Migrations
{
    public partial class moo1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WinnigWithOttoNumber",
                table: "Players",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WinnigWithTootNumber",
                table: "Players",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WinnigWithOttoNumber",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "WinnigWithTootNumber",
                table: "Players");
        }
    }
}
