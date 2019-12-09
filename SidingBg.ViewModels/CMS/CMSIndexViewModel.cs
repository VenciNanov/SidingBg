using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SidingBg.ViewModels.CMS
{
    public class CMSIndexViewModel
    {
        public IQueryable<PageListViewModel> Pages { get; set; }
    }
}
