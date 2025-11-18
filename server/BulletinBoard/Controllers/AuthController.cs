using BulletinBoard.Core.Models;
using BulletinBoard.Core.Services;
using BulletinBoard.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace BulletinBoard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly IPasswordHasher<User> _hasher;
        public AuthController(UserService userService,
                            IPasswordHasher<User> hasher)
        {
            _userService = userService;
            _hasher = hasher;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public IActionResult Login([FromBody] UserDto dto)
        {
            var users = _userService.LoadUsers();
            var user = users.FirstOrDefault(u => u.Username == dto.Username);

            if (user == null)
                return Unauthorized("User not found");

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);

            if (result != PasswordVerificationResult.Success)
                return Unauthorized("Wrong password");

            // יוצרים JWT
            var token = CreateToken(user);

            return Ok(new { token });
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
    {
        new Claim("userId", user.Id.ToString()),
        new Claim("username", user.Username)
    };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("Yaeli_Shmuel_1999_207069584_314907528_yanon_s@#$%^^&*()")
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }



        [HttpPost]
        [HttpPost("register")]
        [AllowAnonymous]
        public IActionResult Register([FromBody] UserDto dto)
        {
            var users = _userService.LoadUsers();

            if (users.Any(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            var user = new User
            {
                Id = users.Any() ? users.Max(u => u.Id) + 1 : 1,
                Username = dto.Username,
            };

            user.PasswordHash = _hasher.HashPassword(user, dto.Password);

            users.Add(user);
            _userService.SaveUsers(users);

            return Ok();
        }
    }
}
