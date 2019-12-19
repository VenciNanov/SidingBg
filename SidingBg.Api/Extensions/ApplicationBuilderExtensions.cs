using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SidingBg.Core;
using SidingBg.Core.Contracts;
using SidingBg.Data;
using SidingBg.Entities;
using SidingBg.Entities.Enums;
using SidingBg.ViewModels.CMS;

namespace SidingBg.Api.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseDatabaseMigration(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var db = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                db.Database.Migrate();

                if (!db.Pages.Any(p => p.Alias == "Index"))
                {
                    SeedHomePage(serviceScope);
                }

                if (!db.Users.Any())
                {
                    SeedAdministrator(serviceScope);
                }
            }
            return app;
        }

        private static void SeedAdministrator(IServiceScope serviceScope)
        {
            var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();

            Task.Run(async () =>
            {
                var userName = "Administrator";
                var password = "secret123";

                var user = new ApplicationUser()
                {
                    UserName = userName,
                    Email = "tep981@gmail.com",
                    PhoneNumber = "0123456789",
                };

                await userManager.CreateAsync(user, password);
            }).Wait();
        }

        private static void SeedHomePage(IServiceScope serviceScope)
        {
            var pageService = serviceScope.ServiceProvider.GetService<IPageService>();

            Task.Run(async () =>
            {
                var routeModel = new CreateRouteViewModel
                {
                    Page = "Index",
                    Controller = "",
                    PageTitle = "Index",
                    Type = (int) PageType.Home
                };

                var page = pageService.CreateRoute(routeModel);
            }).Wait();
        }
    }
}
