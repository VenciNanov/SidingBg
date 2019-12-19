using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using SidingBg.Api.Auth;
using SidingBg.Api.Helpers;
using SidingBg.Core.Settings;
using SidingBg.Entities;
using SidingBg.Extensions;
using SidingBg.ViewModels.Auth;

namespace SidingBg.Api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseController
    {
        private UserManager<ApplicationUser> _userManager;
        private IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions jwtOptions;


        public AuthController(
            IOptions<AppSettings> options,
            UserManager<ApplicationUser> userManager,
            IJwtFactory jwtFactory) : base(options)
        {
            //this.userManager = accountManager.UserManager;
            this._userManager = userManager;
            this._jwtFactory = jwtFactory;
            this.jwtOptions = base.AppSettings.JwtIssuerOptions;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody]LoginViewModel model)
        {
            var user = _userManager.FindByEmailAsync(model.Username).GetAwaiter().GetResult();

            if (user == null)
            {
                return BadRequest();
            }

            var isPassword = _userManager.CheckPasswordAsync(user, model.Password).GetAwaiter().GetResult();

            if (!isPassword)
            {
                return BadRequest();
            }

           // var identity = _jwtFactory.GenerateClaimsIdentity(user.Email, user.Id, null);

            var jwt = Token.GenerateJwt(
                null,
                _jwtFactory,
                user.Email,
                jwtOptions,
                new JsonSerializerSettings { Formatting = Formatting.Indented }).GetAwaiter().GetResult();

            return Ok(new
            {
                jwt = jwt,
                user = user.Email
            });
        }

    }
}