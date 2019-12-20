using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using SidingBg.Api.Config;
using SidingBg.API.Config;
using SidingBg.Api.Configurations;
using SidingBg.Api.Extensions;
using SidingBg.Core;
using SidingBg.Core.Contracts;
using SidingBg.Core.Settings;
using SidingBg.Data;
using SidingBg.Entities;
using SidingBg.Extensions;
using SidingBg.ViewModels;

namespace SidingBg.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();
            //services.AddControllers();

            //services.AddDbContext<ApplicationDbContext>(options =>
            //{
            //    options.UseLazyLoadingProxies();
            //    options.UseSqlServer(
            //        Configuration.GetConnectionString("DefaultConnection"));
            //});

            //services.AddIdentity<User, IdentityRole>(options =>
            //    {
            //        options.Password.RequireDigit = false;
            //        options.Password.RequireLowercase = false;
            //        options.Password.RequireNonAlphanumeric = false;
            //        options.Password.RequireUppercase = false;
            //        options.Password.RequiredLength = 1;
            //    })
            //    .AddDefaultTokenProviders()
            //    .AddEntityFrameworkStores<ApplicationDbContext>();

            //var mappingConfig = new MapperConfiguration(mc =>
            //    mc.AddProfile(new MappingProfile())
            //);
            //// configure strongly typed settings objects
            //var appSettingsSection = Configuration.GetSection("AppSettings");
            ////services.Configure<AppSettings>(appSettingsSection);

            //// configure jwt authentication
            //var appSettings = appSettingsSection.Get<AppSettings>();
            //var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            //services.AddAuthentication(x =>
            //    {
            //        x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //        x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //    })
            //    .AddJwtBearer(x =>
            //    {
            //        x.RequireHttpsMetadata = false;
            //        x.SaveToken = true;
            //        x.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuerSigningKey = true,
            //            IssuerSigningKey = new SymmetricSecurityKey(key),
            //            ValidateIssuer = false,
            //            ValidateAudience = false
            //        };
            //    });
            var appSettings = Configuration.GetSection("AppSettings");
            AppSettings parsedSettings = new AppSettings();
            ConfigurationBinder.Bind(appSettings, parsedSettings);
            services.Configure<AppSettings>(appSettings);
            services.AddMemoryCache();

            DataServicesConfig.ConfigureDataServices(services, Configuration, parsedSettings);
            WebServicesConfig.ConfigureWebServices(services);
            AuthServiceConfig.ConfigJwtAuthentication(services, parsedSettings, Configuration["JWTKey"]);

            
            services.AddScoped<IPageService, PageService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDatabaseMigration();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
