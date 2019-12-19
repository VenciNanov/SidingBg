using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using SidingBg.Api.Auth;
using SidingBg.Core.Settings;

namespace SidingBg.API.Config
{
    internal static class AuthServiceConfig
    {
        private static SymmetricSecurityKey _signingKey;

        internal static void ConfigJwtAuthentication(IServiceCollection services, AppSettings appSettings, string secretKey)
        {
            _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secretKey));

            services.AddTransient<IJwtFactory, JwtFactory>();
            string issuer = appSettings.JwtIssuerOptions.Issuer;
            string audience = appSettings.JwtIssuerOptions.Audience;

            services.Configure<JwtIssuerOptions>(options =>
            {
                options.Issuer = issuer;
                options.Audience = audience;
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = issuer,

                ValidateAudience = true,
                ValidAudience = audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = issuer;
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
            });

            // api user roles policy
            services.AddAuthorization(options =>
            {
                options.AddPolicy($"Require{appSettings.AdminRole}Role", policy => policy.RequireRole(appSettings.AdminRole));
            });
        }
    }
}
