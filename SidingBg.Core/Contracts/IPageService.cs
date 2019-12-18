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
        TabViewModel CreateTab(CreateTabViewModel model);
        bool SaveTabs(SaveTabsViewModel model);
        bool DeleteTab(string id);
        bool DeleteImageFromTab(string tabId);
        List<TabViewModel> GetTabsByContentId(string contentId);
        CMSIndexViewModel GetAll();
        AddEditPageViewMode Get(string id);
        AddEditPageViewMode CreatePage(AddEditPageViewMode model);
        AddEditPageViewMode GetByAlias(string alias);
        PageType GetType(string alias);
        ImageViewModel CreateImage(CreateImageViewModel model);
        bool DeleteImage(string id);
        bool DeactivatePage(string id);

        MenuItemsViewModel GetMenuItems();

    }
}
