using System;
using System.Collections.Generic;
using System.Text;

namespace SidingBg.Entities.Routes
{
    public class Image
    {
        public Image()
        {
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        public string ContentType { get; set; }
        public string Name { get; set; }
        public string Base64 { get; set; }
        public int Position { get; set; }
        public string ContentId { get; set; }
        public virtual Content Content { get; set; }

    }
}
