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

        private int GetUserId()
        {
            var claim = User.FindFirst("userId");
            return claim != null ? int.Parse(claim.Value) : 0;
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
            var userName = User?.Identity?.Name;
            var claim = User?.FindFirst("userId");
            if (claim == null) return Unauthorized("No user claim found");

            int userId = GetUserId();
            bulletin.UserId = userId;

            var created = _service.Add(bulletin);
            return Ok(created);
        }

        [HttpPut("{id}")]
        [ActionName("UpdateBulletin")]
        public IActionResult UpdateBulletin(int id, Bulletin bulletin)
        {
            int userId = GetUserId();
            var existing = _service.Get(id);
            if (existing == null)
                return NotFound();

            if (existing.UserId != userId)
                return Forbid();

            bulletin.UserId = userId;
            var updated = _service.Update(id, bulletin);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        [ActionName("DeleteBulletin")]
        public IActionResult DeleteBulletin(int id)
        {
            int userId = GetUserId();

            var existing = _service.Get(id);
            if (existing == null)
                return NotFound();

            if (existing.UserId != userId)
                return Forbid();

            _service.Delete(id);
            return Ok();
        }
    }
}
