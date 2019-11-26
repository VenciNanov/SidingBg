using Microsoft.EntityFrameworkCore.Migrations;

namespace SidingBg.Data.Migrations
{
    public partial class FixForPage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contents_Pages_PageId1",
                table: "Contents");

            migrationBuilder.DropIndex(
                name: "IX_Contents_PageId1",
                table: "Contents");

            migrationBuilder.DropColumn(
                name: "PageId",
                table: "Contents");

            migrationBuilder.DropColumn(
                name: "PageId1",
                table: "Contents");

            migrationBuilder.AlterColumn<string>(
                name: "ContentId",
                table: "Pages",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pages_ContentId",
                table: "Pages",
                column: "ContentId",
                unique: true,
                filter: "[ContentId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Pages_Contents_ContentId",
                table: "Pages",
                column: "ContentId",
                principalTable: "Contents",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pages_Contents_ContentId",
                table: "Pages");

            migrationBuilder.DropIndex(
                name: "IX_Pages_ContentId",
                table: "Pages");

            migrationBuilder.AlterColumn<string>(
                name: "ContentId",
                table: "Pages",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageId",
                table: "Contents",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PageId1",
                table: "Contents",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contents_PageId1",
                table: "Contents",
                column: "PageId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Contents_Pages_PageId1",
                table: "Contents",
                column: "PageId1",
                principalTable: "Pages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
