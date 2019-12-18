using System;
using System.Collections.Generic;
using System.Text;
using SidingBg.Entities.Enums;

namespace SidingBg.Entities.Routes
{
    public class Page
    {
        public Page()
        {
            Id = Guid.NewGuid().ToString();
            IsActive = true;
        }
        public string Id { get; set; }
        //searched by
        public string Alias { get; set; }
        public string Name { get; set; }
        public string ControllerId { get; set; }
        public virtual Controller Controller { get; set; }
        public string ContentId { get; set; }
        public virtual Content Content { get; set; }
        public PageType Type { get; set; }
        public bool IsActive { get; set; }
    }
}
