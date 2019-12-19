using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SidingBg.Core.Settings;

namespace SidingBg.Api.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public abstract class BaseController : ControllerBase
    {
        //private ApplicationUser currentUser;

        public BaseController(IOptions<AppSettings> options)
        {
            this.AppSettings = options.Value;
        }

        protected AppSettings AppSettings { get; }


        //protected async Task<ApplicationUser> GetCurrentUserAsync()
        //{
        //    if (currentUser == null)
        //    {
        //        currentUser = await this.userManager.GetUserAsync(this.User);
        //    }

        //    return currentUser;
        //}
    }
}
