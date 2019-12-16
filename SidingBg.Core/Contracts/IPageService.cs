using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using SidingBg.Entities.Enums;
using SidingBg.ViewModels.CMS;
using SidingBg.ViewModels.FrontEnd;

namespace SidingBg.Core.Contracts
{
    public interface IPageService
    {
        CreateRouteViewModel CreateRoute(CreateRouteViewModel vm);
        bool CreateTab(CreateTabViewModel model);
        bool SaveTabs(SaveTabsViewModel model);
        List<TabViewModel> GetTabsByContentId(string contentId);
        CMSIndexViewModel GetAll();
        AddEditPageViewMode Get(string id);
        AddEditPageViewMode CreatePage(AddEditPageViewMode model);
        AddEditPageViewMode GetByAlias(string alias);
        PageType GetType(string alias);

        MenuItemsViewModel GetMenuItems();

    }
}
