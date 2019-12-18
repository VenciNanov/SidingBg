using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SidingBg.Core;
using SidingBg.Core.Contracts;
using SidingBg.Data;
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
                    var pageService = serviceScope.ServiceProvider.GetService<IPageService>();

                    Task.Run(async () =>
                    {
                        var routeModel = new CreateRouteViewModel
                        {
                            Page = "Index",
                            Controller = "",
                            PageTitle = "Index",
                            Type = (int)PageType.Home
                        };

                        var page = pageService.CreateRoute(routeModel);
                    }).Wait();
                }
            }
            return app;
        }
    }
}
