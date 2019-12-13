using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SidingBg.ViewModels.CMS
{
    public class AddEditPageViewMode
    {
        public string PageId { get; set; }
        public string PageName { get; set; }
        public int Type { get; set; }
        public string[] Contents { get; set; }
        //Base64 images
        public string[] Images{ get; set; }
    }
}
