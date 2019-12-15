using System;
using System.Collections.Generic;
using System.Text;

namespace SidingBg.ViewModels.CMS
{
    public class SaveTabsViewModel
    {
        public string ContentId { get; set; }
        public TabViewModel[] Tabs { get; set; }
    }
}
