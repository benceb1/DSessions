using AutoMapper;
using DrinkSessionsApp.Data.Interfaces;
using DrinkSessionsApp.Dtos;
using DrinkSessionsApp.Models;
using DrinkSessionsApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DrinkSessionsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IDrinkSessionRepo _drinkSessionRepo;
        private readonly IUserService _userService;

        public SessionController(IMapper mapper, IDrinkSessionRepo drinkSessionRepo, IUserService userService)
        {
            _mapper = mapper;
            _drinkSessionRepo = drinkSessionRepo;
            _userService = userService;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<IEnumerable<DrinkSessionReadDto>>> GetSessions()
        {
            var name = _userService.GetName();
            var sessions = await _drinkSessionRepo.GetWhere(s => s.User!.Name == name);
            return Ok(sessions);
        }

        [HttpGet("openSessions")]
        public async Task<ActionResult<IEnumerable<DrinkSessionReadDto>>> GetOpenSessions()
        {
            // Ezen még dolgozni kell mert nem efficient
            var sessions = await _drinkSessionRepo
                .GetAll()
                .Where(s => s.Closed == false)
                .Include(s => s.Venue)
                .Include(s => s.Consumptions)
                .ToListAsync();

            return Ok(_mapper.Map<IEnumerable<DrinkSessionReadDto>>(sessions));
        }

        [HttpPost(Name = "CreateSession"), Authorize]
        public async Task<ActionResult<DrinkSessionReadDto>> CreateSession(DrinkSessionCreateDto drinkSessionCreateDto)
        {
            var sessionsExistsWithCurrentCode = await _drinkSessionRepo.GetWhere(x => x.Code == drinkSessionCreateDto.Code);

            foreach (var item in sessionsExistsWithCurrentCode)
            {
                if (!item.Closed)
                {
                    return BadRequest("An open session already exists with this code");
                }
            }

            var session = _mapper.Map<DrinkSession>(drinkSessionCreateDto);
            session.CreatedDate = DateTime.Now;

            await _drinkSessionRepo.Create(session);

            var sessionReadDto = _mapper.Map<DrinkSessionReadDto>(session);
        
            return Ok(sessionReadDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<DrinkSessionReadDto>> CloseSession(int id)
        {
            var session = await _drinkSessionRepo.GetById(id);

            if (session == null)
            {
                return BadRequest("Session not found");
            }

            session.Closed = true;

            await _drinkSessionRepo.Update(session);

            return Ok(_mapper.Map<DrinkSessionReadDto>(session));
        }
    }
}
