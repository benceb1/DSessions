using AutoMapper;
using DrinkSessionsApp.Data;
using DrinkSessionsApp.Dtos;
using DrinkSessionsApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DrinkSessionsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VenueController : ControllerBase
    {
        private readonly IVenueRepo _venueRepo;
        private readonly IMapper _mapper;

        public VenueController(IVenueRepo venueRepo, IMapper mapper)
        {
            _venueRepo = venueRepo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetVenueById")]
        public async Task<ActionResult<VenueReadDto>> GetVenueById(int id)
        {
            var venueModel = await _venueRepo.GetById(id);
            if (venueModel != null)
            {
                return Ok(_mapper.Map<VenueReadDto>(venueModel));
            }
            return NotFound();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VenueReadDto>>> GetAllVenues()
        {
            var venues = await _venueRepo.GetAll().Include(v => v.Products).ToListAsync();
            return Ok(_mapper.Map<IEnumerable<VenueReadDto>>(venues));
        }

        [HttpPost]
        public async Task<ActionResult<VenueReadDto>> AddVenue(VenueCreateDto venueCreateDto)
        {
            var venueModel = _mapper.Map<Venue>(venueCreateDto);
            await _venueRepo.Create(venueModel);

            var venueReadDto = _mapper.Map<VenueReadDto>(venueModel);

            Console.WriteLine($"Model State is: {ModelState.IsValid}");

            return CreatedAtRoute(nameof(GetVenueById), new { Id = venueReadDto.Id }, venueReadDto);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteVenue(int id)
        {
            var venueModel = await _venueRepo.GetById(id);
            if (venueModel == null)
            {
                return NotFound();
            }
            await _venueRepo.Delete(venueModel);

            return NoContent();
        }

    }
}
