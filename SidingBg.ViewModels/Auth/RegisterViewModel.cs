using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SidingBg.ViewModels.Auth
{
    public class RegisterViewModel 
    {
        public string Email { get; set; }
        [DataType(DataType.Password)]
        public string Password { get; set; }
        //public string ConfirmPassword { get; set; }
    }
}
