using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SidingBg.Core.Contracts;

namespace SidingBg.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private IPageService _pageService;
        public PagesController(IPageService page)
        {
            _pageService = page;
        }
        [HttpGet]
        [Route("GetPage")]
        public IActionResult GetPage(string alias)
        {
            var response = _pageService.GetByAlias(alias);
            return Ok(response);
        }

        [HttpGet]
        [Route("GetPageInfo")]
        public IActionResult GetPageInfo(string alias)
        {
            var response = _pageService.GetType(alias);
            return Ok(new { type = response });
        }

        [HttpGet]
        [Route("GetMenuItems")]
        public IActionResult GetMenuItems()
        {
            var response = _pageService.GetMenuItems();
            return Ok(response);
        }

    }
}