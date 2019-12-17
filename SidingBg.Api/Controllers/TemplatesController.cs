using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SidingBg.Core;
using SidingBg.Core.Contracts;
using SidingBg.ViewModels.CMS;

namespace SidingBg.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplatesController : ControllerBase
    {
        private IPageService _pageService;
        public TemplatesController(IPageService page)
        {
            _pageService=page;    
        }

        [HttpPost]
        [Route("CreateRoute")]
        public IActionResult CreateRoute([FromBody] CreateRouteViewModel model)
        {
            var result = _pageService.CreateRoute(model);

            return Ok(model);
        }

        [HttpPost]
        [Route("CreateTab")]
        public IActionResult CreateTab(CreateTabViewModel model)
        {
            var result = _pageService.CreateTab(model);
            if (!result)
                return BadRequest();

            var response = _pageService.GetTabsByContentId(model.ContentId);
            return Ok(response);
        }

        [HttpPost]
        [Route("SaveTabs")]
        public IActionResult SaveTab(SaveTabsViewModel model)
        {
            var res = _pageService.SaveTabs(model);
            if (!res)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult Index()
        {
            var response = _pageService.GetAll();
            return Ok(response);
        }

        [HttpGet]
        [Route("AddEditPage")]
        public IActionResult GetById(string id)
        {
            var response = _pageService.Get(id);

            return Ok(response);
        }
        [HttpPost]
        [Route("AddEditPage")]
        public IActionResult AddEditPage(AddEditPageViewMode model)
        {
            var response = _pageService.CreatePage(model);

            if (response==null)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPost]
        [Route("UploadImage")]
        public IActionResult UploadImage(CreateImageViewModel model)
        {
            var response = _pageService.CreateImage(model);

            if (response == null)
            {
                return BadRequest();
            }

            return Ok(response);
        }

        [HttpPost]
        [Route("DeleteImage")]
        public IActionResult DeleteImage(string id)
        {
            var response = _pageService.DeleteImage(id);
            if (!response)
            {
                return BadRequest();
            }


            return Ok();
        }
    }
}