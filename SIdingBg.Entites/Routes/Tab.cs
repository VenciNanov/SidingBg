using System;
using System.Collections.Generic;
using System.Text;

namespace SidingBg.Entities.Routes
{
    public class Tab
    {
        public Tab()
        {
            Id = Guid.NewGuid().ToString();
            Images = new HashSet<Image>();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public string ContentId { get; set; }
        public virtual Content Content { get; set; }
    }
}
