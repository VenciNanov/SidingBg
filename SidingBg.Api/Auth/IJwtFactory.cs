﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SidingBg.Api.Auth
{
    public interface IJwtFactory
    {
        Task<string> GenerateEncodedToken(string username, ClaimsIdentity identity);

        ClaimsIdentity GenerateClaimsIdentity(string userName, string id, IEnumerable<string> roles);
    }
}
