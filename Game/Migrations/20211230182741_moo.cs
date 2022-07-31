using Microsoft.EntityFrameworkCore.Migrations;

namespace Game.Migrations
{
    public partial class moo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentGames");

            migrationBuilder.RenameColumn(
                name: "WinningMove",
                table: "Players",
                newName: "LastWinningMove");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastWinningMove",
                table: "Players",
                newName: "WinningMove");

            migrationBuilder.CreateTable(
                name: "CurrentGames",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentGames", x => x.ID);
                    table.ForeignKey(
                        name: "FK_CurrentGames_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CurrentGames_PlayerId",
                table: "CurrentGames",
                column: "PlayerId");
        }
    }
}
