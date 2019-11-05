using System;
using Microsoft.AspNetCore.Identity;

namespace SidingBg.Entities
{
    public class User:IdentityUser
    {
        public string Token { get; set; }
    }
}
