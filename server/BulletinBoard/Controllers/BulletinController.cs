using BulletinBoard.Core.Models;
using BulletinBoard.Services;
using Microsoft.AspNetCore.Mvc;

namespace BulletinBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BulletinsController : ControllerBase
    {
        private readonly BulletinService _service;

        public BulletinsController(BulletinService service)
        {
            _service = service;
        }

        [HttpGet]
        [ActionName("GetAllBulletins")]
        public IActionResult GetAllBulletins() =>
            Ok(_service.GetAll());


        [HttpGet("{id}")]
        [ActionName("GetBulletinById")]
        public IActionResult GetBulletinById(int id)
        {
            var item = _service.Get(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        [ActionName("CreateBulletin")]
        public IActionResult CreateBulletin([FromBody] Bulletin bulletin)
        {
            var created = _service.Add(bulletin);
            return Ok(created);
        }

        [HttpPut("{id}")]
        [ActionName("UpdateBulletin")]
        public IActionResult UpdateBulletin(int id, Bulletin bulletin)
        {
            var updated = _service.Update(id, bulletin);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        [ActionName("DeleteBulletin")]
        public IActionResult DeleteBulletin(int id)
        {
            var success = _service.Delete(id);
            return success ? Ok() : NotFound();
        }
    }
}
