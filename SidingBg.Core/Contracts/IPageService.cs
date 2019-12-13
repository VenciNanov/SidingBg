using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SidingBg.Entities.Enums;
using SidingBg.ViewModels.CMS;

namespace SidingBg.Core.Contracts
{
    public interface IPageService
    {
        CreateRouteViewModel CreateRoute(CreateRouteViewModel vm);
        CMSIndexViewModel GetAll();
        AddEditPageViewMode Get(string id);
        AddEditPageViewMode CreatePage(AddEditPageViewMode model);
        AddEditPageViewMode GetByAlias(string alias);
        PageType GetType(string alias);

    }
}
