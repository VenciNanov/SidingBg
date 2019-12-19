using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace SidingBg.ViewModels.Auth
{
    public class ResponseTokenViewModel
    {

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("auth_token")]
        public string Token { get; set; }

        [JsonProperty("expires_in")]
        public int Expires { get; set; }
    }
}
