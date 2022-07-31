using Microsoft.EntityFrameworkCore.Migrations;

namespace Game.Migrations
{
    public partial class moo12 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WinnigWithTootNumber",
                table: "Players",
                newName: "TootNumber");

            migrationBuilder.RenameColumn(
                name: "WinnigWithOttoNumber",
                table: "Players",
                newName: "OttoNumber");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TootNumber",
                table: "Players",
                newName: "WinnigWithTootNumber");

            migrationBuilder.RenameColumn(
                name: "OttoNumber",
                table: "Players",
                newName: "WinnigWithOttoNumber");
        }
    }
}
