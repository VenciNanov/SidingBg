using System;
using System.Collections.Generic;
using System.Text;

namespace SidingBg.Entities.Routes
{
    public class Controller
    {
        public Controller()
        {
            Pages=new List<Page>(); 
            Id = Guid.NewGuid().ToString();
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Page> Pages { get; set; }

    }
}
