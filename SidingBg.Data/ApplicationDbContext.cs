using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SidingBg.Entities;
using SidingBg.Entities.Routes;

namespace SidingBg.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, IdentityRole, string>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Content> Contents { get; set; }
        public virtual DbSet<Controller> Controllers { get; set; }
        public virtual DbSet<Image> Images { get; set; }
        public virtual DbSet<TextField> TextFields { get; set; }
        public virtual DbSet<Page> Pages { get; set; }
        public virtual DbSet<Tab> Tabs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
