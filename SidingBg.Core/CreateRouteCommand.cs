using System;
using System.Threading.Tasks;
using SidingBg.Core.Contracts;
using SidingBg.Data;
using SidingBg.Entities.Routes;
using SidingBg.ViewModels.CMS;

namespace SidingBg.Core
{
    public class PageService: IPageService
    {
        private ApplicationDbContext _context;

        public PageService(ApplicationDbContext context)
        {
            _context = context;
        }
        public  CreateRouteViewModel CreateRoute(CreateRouteViewModel vm)
        {
            var content = new Content()
            {
                Header = vm.PageTitle,
            };
            _context.Contents.Add(content);
            var page = new Page()
            {
                Name = vm.Page,
                Content = content
            };
            
            _context.Pages.AddAsync(page);
            var controller = new Controller()
            {
                Name = vm.Controller
            };
            controller.Pages.Add(page);
            _context.Controllers.Add(controller);
           
          

            _context.SaveChanges();

            return vm;
        }
    }
}
