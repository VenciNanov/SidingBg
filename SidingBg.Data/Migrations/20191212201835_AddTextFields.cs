using Microsoft.EntityFrameworkCore.Migrations;

namespace SidingBg.Data.Migrations
{
    public partial class AddTextFields : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TextField_Contents_ContentId",
                table: "TextField");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TextField",
                table: "TextField");

            migrationBuilder.RenameTable(
                name: "TextField",
                newName: "TextFields");

            migrationBuilder.RenameIndex(
                name: "IX_TextField_ContentId",
                table: "TextFields",
                newName: "IX_TextFields_ContentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TextFields",
                table: "TextFields",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TextFields_Contents_ContentId",
                table: "TextFields",
                column: "ContentId",
                principalTable: "Contents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TextFields_Contents_ContentId",
                table: "TextFields");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TextFields",
                table: "TextFields");

            migrationBuilder.RenameTable(
                name: "TextFields",
                newName: "TextField");

            migrationBuilder.RenameIndex(
                name: "IX_TextFields_ContentId",
                table: "TextField",
                newName: "IX_TextField_ContentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TextField",
                table: "TextField",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TextField_Contents_ContentId",
                table: "TextField",
                column: "ContentId",
                principalTable: "Contents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
