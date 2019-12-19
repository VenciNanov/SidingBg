using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SidingBg.Api.Auth;
using SidingBg.Core.Settings;
using SidingBg.ViewModels.Auth;

namespace SidingBg.Api.Helpers
{
    public class Token
    {
        public static async Task<ResponseTokenViewModel> GenerateJwt(
            ClaimsIdentity identity,
            IJwtFactory jwtFactory,
            string userName,
            JwtIssuerOptions jwtOptions,
            JsonSerializerSettings serializerSettings)
        {
            var response = new ResponseTokenViewModel
            {
                Id = "adminId",
                Token = await jwtFactory.GenerateEncodedToken(userName, identity),
                Expires = (int)jwtOptions.ValidFor.TotalSeconds
            };

            return response;
        }
    }
}
