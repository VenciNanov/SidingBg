using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SidingBg.ViewModels.CMS;

namespace SidingBg.Core.Contracts
{
    public interface IPageService
    {
        CreateRouteViewModel CreateRoute(CreateRouteViewModel vm);
    }
}
