using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SidingBg.Entities.Routes
{
    public class Content
    {
        public Content()
        {
            Id = Guid.NewGuid().ToString();
            TextFields=new List<TextField>();
        }
        public string Id { get; set; }
        public string Header { get; set; }
        public virtual Page Page{ get; set; }
        public virtual ICollection<TextField> TextFields { get; set; }
        
    }
}
