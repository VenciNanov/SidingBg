using Microsoft.EntityFrameworkCore.Migrations;

namespace SidingBg.Data.Migrations
{
    public partial class AddIsActiveFlagForPages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Pages",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Pages");
        }
    }
}
