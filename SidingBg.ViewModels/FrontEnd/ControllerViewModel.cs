using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace SidingBg.ViewModels.FrontEnd
{
    public class ControllerViewModel
    {
        public ControllerViewModel()
        {
            Pages=new List<PageViewModel>();
        }

        public List<PageViewModel> Pages { get; set; }
        public string Name { get; set; }
    }
}
