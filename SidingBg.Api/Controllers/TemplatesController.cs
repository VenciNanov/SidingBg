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
    }
}