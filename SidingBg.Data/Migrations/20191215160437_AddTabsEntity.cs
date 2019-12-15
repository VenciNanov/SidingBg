using Microsoft.EntityFrameworkCore.Migrations;

namespace SidingBg.Data.Migrations
{
    public partial class AddTabsEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TabId",
                table: "Images",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Tabs",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Text = table.Column<string>(nullable: true),
                    ContentId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tabs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tabs_Contents_ContentId",
                        column: x => x.ContentId,
                        principalTable: "Contents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Images_TabId",
                table: "Images",
                column: "TabId");

            migrationBuilder.CreateIndex(
                name: "IX_Tabs_ContentId",
                table: "Tabs",
                column: "ContentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Tabs_TabId",
                table: "Images",
                column: "TabId",
                principalTable: "Tabs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Tabs_TabId",
                table: "Images");

            migrationBuilder.DropTable(
                name: "Tabs");

            migrationBuilder.DropIndex(
                name: "IX_Images_TabId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "TabId",
                table: "Images");
        }
    }
}
