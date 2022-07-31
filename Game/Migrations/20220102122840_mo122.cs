using Microsoft.EntityFrameworkCore.Migrations;

namespace Game.Migrations
{
    public partial class mo122 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfLosses",
                table: "Players",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfLosses",
                table: "Players");
        }
    }
}
