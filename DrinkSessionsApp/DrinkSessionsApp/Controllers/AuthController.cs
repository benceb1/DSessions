using AutoMapper;
using DrinkSessionsApp.Data;
using DrinkSessionsApp.Dtos;
using DrinkSessionsApp.Models;
using DrinkSessionsApp.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace DrinkSessionsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private readonly IUserRepo _userRepo;

        public AuthController(IMapper mapper, IConfiguration config, IUserService userService, IUserRepo userRepo)
        {
            _mapper = mapper;
            _config = config;
            _userService = userService;
            _userRepo = userRepo;
        }

        [HttpGet("me"), Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task <ActionResult<UserReadDto>> GetMe()
        {
            var userName = _userService.GetName();
            var user = await _userRepo.GetOneWhere(u => u.Name == userName);
            return Ok(_mapper.Map<UserReadDto>(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserLoginSuccessDto>> RegisterUser(UserCreateDto request)
        {
            var userExists = await _userRepo.GetOneWhere(x => x.Name == request.Name);
            if (userExists != null)
            {
                return BadRequest("User already exists with this name!");
            }

            request.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = _mapper.Map<User>(request);
  
            await _userRepo.Create(user);

            string token = CreateToken(user);

            var userResponse = _mapper.Map<UserLoginSuccessDto>(user);
            userResponse.Token = token;

            return Ok(userResponse);
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserLoginSuccessDto>> LoginUser(UserLoginDto request)
        {
            var user = await _userRepo.GetOneWhere(x => x.Name == request.Name);
          
            if (user == null)
            {
                return BadRequest("User not found!");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(user);

            var userResponse = _mapper.Map<UserLoginSuccessDto>(user);
            userResponse.Token = token;

            return Ok(userResponse);
        }

        [HttpDelete, Authorize]
        public async Task<ActionResult> DeleteVenue()
        {
            var user = await _userRepo.GetOneWhere(x => x.Name == _userService.GetName());
            if (user == null)
            {
                return NotFound();
            }
            await _userRepo.Delete(user);

            return NoContent();
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Name),
            };

            var appsettingsToken = _config.GetSection("AppSettings:Token").Value;
            if (appsettingsToken == null)
            {
                appsettingsToken = "basicToken";
            }
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appsettingsToken));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
