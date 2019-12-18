using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SidingBg.Core.Contracts;
using SidingBg.Data;
using SidingBg.Entities.Enums;
using SidingBg.Entities.Routes;
using SidingBg.ViewModels.CMS;
using SidingBg.ViewModels.FrontEnd;

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
                Content = content,
                Type = (PageType) vm.Type
            };

            _context.Pages.AddAsync(page);

            var controller = _context.Controllers.FirstOrDefault(c => c.Name.ToLower() == vm.Controller);
            if (controller == null)
            {
                var controllerEntity = new Controller()
                {
                    Name = vm.Controller
                };
                controllerEntity.Pages.Add(page);
                _context.Controllers.Add(controllerEntity);
            }
            else
            {
                controller.Pages.Add(page);
            }

            page.Alias = $"{page.Name}";

            _context.SaveChanges();

            return vm;
        }

        public bool SaveTabs(SaveTabsViewModel model)
        {
            foreach (var tab in model.Tabs)
            {
                var tabEntity = _context.Tabs.Find(tab.Id);
                tabEntity.Text = tab.Text;
                if (tab.Images.Length>0)
                {
                    var image =new Image(tab.Images[0]);
                    
                    _context.Images.Add(image);

                    tabEntity.Images.Add(image);
                }
                
            }

            _context.SaveChanges();

            return true;
        }

        public CMSIndexViewModel GetAll()
        {
            var pages = _context.Pages.Where(x=>x.Alias!="Index").Select(p => new PageListViewModel()
            {
                Controller = p.Controller.Name,
                Page = p.Name,
                PageId = p.Id,
                Type=(int)p.Type
            });

            var model = new CMSIndexViewModel
            {
                Pages = pages
            };

            return model;
        }

        public ImageViewModel CreateImage(CreateImageViewModel model)
        {
            var page = _context.Pages.Find(model.PageId);
            if (page==null)
            {
                return null;
            }

            var image = new Image(model.Image) {ContentId = page.ContentId};
            _context.Images.Add(image);
            _context.SaveChanges();

            var response = new ImageViewModel
            {
                Base64 = image.Base64,
                Id = image.Id
            };

            return response;
        }

        public bool DeleteImage(string id)
        {
            var image = _context.Images.Find(id);
            if (image==null)
            {
                return false;
            }
            _context.Images.Remove(image);
            _context.SaveChanges();
            return true;
        }

        public AddEditPageViewMode Get(string id)
        {
            var page = _context.Pages.Find(id);
            if (page==null)
            {
                page = _context.Pages.FirstOrDefault(x => x.Alias == id);
            }

            if (page==null)
            {
                return null;
            }

            var model = new AddEditPageViewMode
            {
                PageId = page.Id,
                PageName = page.Name,
                Contents = page.Content.TextFields.Select(c => c.Text)
                    .ToArray(),
                Images = page.Content.Images.Select(i =>new ImageViewModel
                    {
                        Id = i.Id,
                        Base64 = i.Base64
                    })
                    .ToArray(),
                Type = (int)page.Type,
                ContentId = page.ContentId,
                Tabs = page.Content.Tabs.Select(tab=>new AddEditTabViewModel
                {
                    Id=tab.Id,
                    Images = tab.Images.Select(i=>i.Base64).ToArray(),
                    Name = tab.Name,
                    Text = tab.Text
                }).ToArray()
            };

            return model;
        }

        public PageType GetType(string alias)
        {
            var page = _context.Pages.FirstOrDefault(p => p.Alias == alias);

            return page.Type;
        }

        public MenuItemsViewModel GetMenuItems()
        {
            var vm = new MenuItemsViewModel();
            var controllers = _context.Controllers.ToList();
            foreach (var controller in controllers)
            {
                var ctrlModel = new ControllerViewModel
                {
                    Name = controller.Name,
                    Pages = controller.Pages.Select(p => new PageViewModel
                        {
                            Alias = p.Alias,
                            HeaderName = p.Content.Header,
                            Name = p.Name,
                            Type = (int) p.Type
                        })
                        .ToList()
                };
                vm.Controllers.Add(ctrlModel);
            }

            return vm;
        }

        public AddEditPageViewMode GetByAlias(string alias)
        {
            var page = _context.Pages.FirstOrDefault(p => p.Alias.ToLower() == alias.ToLower());

            var model = new AddEditPageViewMode
            {
                PageId = page.Id,
                PageName = page.Name,
                Contents = page.Content.TextFields.Select(c => c.Text)
                    .ToArray(),
                Images = page.Content.Images.Select(i =>new ImageViewModel
                    {
                        Id = i.Id,
                        Base64 = i.Base64
                    })
                    .ToArray(),
                Tabs = page.Type==(PageType)2? page.Content.Tabs.Select(tab=>new AddEditTabViewModel
                {
                    Id=tab.Id,
                    Name = tab.Name,
                    Text = tab.Text,
                    Images = tab.Images.Select(i=>i.Base64).ToArray()
                }).ToArray():null
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

            if (page.Content == null)
            {
                CreateContent(page);
            }

            //if (page.Type == PageType.Tabs)
            //{
            //    CreateTab(model,
            //        page);
            //}

            var contentId = page.ContentId;

            if (page.Content.TextFields.Count == 0)
            {
                CreateTextFields(model,
                    contentId);
            }
            else
            {
                EditTextFields(model,
                    page);
            }


            if (model.Images.Length > 0)
            {
                CreateImage(model,
                    page);
            }

            _context.SaveChanges();

            return model;
        }

        private void CreateContent(Page page)
        {
            var content = new Content()
            {
                Header = page.Name,
                Page = page
            };
            _context.Contents.Add(content);
            _context.SaveChanges();
        }

        private void CreateTab(AddEditPageViewMode model,
            Page page)
        {
            foreach (var tab in model.Tabs)
            {
                var tabEntity = new Tab
                {
                    Content = page.Content,
                    Text = tab.Text,
                    Name = tab.Name
                };
                _context.Tabs.Add(tabEntity);

                foreach (var tabImage in tab.Images)
                {
                    var imageEntity = new Image
                    {
                        Base64 = tabImage,
                        Tab = tabEntity,
                    };
                    _context.Images.Add(imageEntity);
                }
            }

            _context.SaveChanges();
        }

        public bool CreateTab(CreateTabViewModel model)
        {
            var content = _context.Contents.Find(model.ContentId);
            if (content == null)
                return false;

            var tab = new Tab
            {
                Name = model.TabName,
                ContentId = content.Id
            };

            _context.Tabs.Add(tab);
            _context.SaveChanges();

            return true;
        }

        public List<TabViewModel> GetTabsByContentId(string contentId)
        {
            var content = _context.Contents.Find(contentId);

            var model = new List<TabViewModel>();
            model = content.Tabs.Select(t => new TabViewModel
            {
                Id = t.Id,
                Name = t.Name,
                Images = t.Images.Select(i=>i.Base64).ToArray(),
                Text = t.Text
            }).ToList();
            return model;
        }

        private static void EditTextFields(AddEditPageViewMode model,
            Page page)
        {
            for (int i = 0;
                i < model.Contents.Length;
                i++)
            {
                var input = model.Contents[i];
                page.Content.TextFields.ToArray()[i]
                        .Text = input ?? "";
            }
        }

        private void CreateTextFields(AddEditPageViewMode model,
            string contentId)
        {
            foreach (var content in model.Contents)
            {
                var entity = new TextField
                {
                    ContentId = contentId,
                    Text = content ?? ""
                };

                _context.TextFields.Add(entity);
            }
        }

        private void CreateImage(AddEditPageViewMode model,
            Page page)
        {
            for (int i = 0;
                i < model.Images.Length;
                i++)
            {
                var image = model.Images[i];
                if (page.Content.Images.Count >= i + 1 && page.Content.Images.Count > 0)
                {
                    page.Content.Images.ToArray()[i]
                        .Base64 = image.Base64;
                }
                else
                {
                    var entityImage = new Image
                    {
                        Base64 = image.Base64,
                        Content = page.Content,
                        Position = i,
                    };

                    _context.Images.Add(entityImage);
                }
            }
        }

    }
}