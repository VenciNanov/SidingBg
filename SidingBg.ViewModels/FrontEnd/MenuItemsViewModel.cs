using System;
using System.Collections.Generic;
using System.Text;

namespace SidingBg.ViewModels.FrontEnd
{
    public class MenuItemsViewModel
    {
        public MenuItemsViewModel()
        {
            Controllers=new List<ControllerViewModel>(); 
        }
        public List<ControllerViewModel> Controllers { get; set; }
    }
}
