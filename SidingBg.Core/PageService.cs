using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SidingBg.Core.Contracts;
using SidingBg.Data;
using SidingBg.Entities.Routes;
using SidingBg.ViewModels.CMS;

namespace SidingBg.Core
{
    public class PageService : IPageService
    {
        private ApplicationDbContext _context;


        public PageService(ApplicationDbContext context)
        {
            _context = context;
        }
        public CreateRouteViewModel CreateRoute(CreateRouteViewModel vm)
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

        public CMSIndexViewModel GetAll()
        {
            var pages = _context.Pages.Select(p => new PageListViewModel()
            {
                Controller = p.Controller.Name,
                Page = p.Name,
                PageId = p.Id
            });

            var model = new CMSIndexViewModel
            {
                Pages = pages
            };

            return model;
        }

        public AddEditPageViewMode Get(string id)
        {
            var page = _context.Pages.Find(id);

            var model = new AddEditPageViewMode
            {
                PageId = page.Id,
                PageName = page.Name,
                //Contents = page.Content.TextFields.Select(c=>c.Text)
            };

            return model;
        }

        public AddEditPageViewMode CreatePage(AddEditPageViewMode model)
        {
            var page = _context.Pages.Find(model.PageId);

            if (page == null)
            {
                return null;
            }

            if (page.Content==null)
            {
                var content = new Content(){Header = page.Name,Page=page};
                _context.Contents.Add(content);
                _context.SaveChanges();
            }

            var contentId = page.ContentId;

            foreach (var content in model.Contents)
            {
                var entity = new TextField
                {
                    ContentId = contentId,
                    Text = content
                };

                _context.TextFields.Add(entity);
            }

            _context.SaveChanges();

            return model;

        }
    }
}
