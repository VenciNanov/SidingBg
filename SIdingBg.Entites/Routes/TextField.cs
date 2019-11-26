using System;
using System.Collections.Generic;
using System.Text;

namespace SidingBg.Entities.Routes
{
    public class TextField
    {
        public TextField()
        {
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        public string Text { get; set; }
        public string ContentId { get; set; }
        public virtual Content Content { get; set; }
    }
}
