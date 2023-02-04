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
    public class ProductController : ControllerBase
    {

        private readonly IVenueRepo _venueRepo;
        private readonly IProductRepo _productRepo;
        private readonly IMapper _mapper;

        public ProductController(IVenueRepo venueRepo, IProductRepo productRepo, IMapper mapper)
        {
            _venueRepo = venueRepo;
            _productRepo = productRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetAllProducts()
        {
            var products = await _productRepo.GetAll().ToListAsync();
            return Ok(_mapper.Map<IEnumerable<ProductReadDto>>(products));
        }

        [HttpGet("byVenue/{id}", Name = "GetProductByVenue")]
        public async Task<ActionResult<IEnumerable<ProductReadDto>>> GetProductsByVenue(int id)
        {
            var products = await _productRepo.GetWhere(p => p.VenueId == id);
            return Ok(_mapper.Map<IEnumerable<ProductReadDto>>(products));
        }

        [HttpGet("{id}", Name = "GetProductById")]
        public async Task<ActionResult<ProductReadDto>> GetProductById(int id)
        {
            var productModel = await _productRepo.GetById(id);
            if (productModel != null)
            {
                return Ok(_mapper.Map<ProductReadDto>(productModel));
            }

            return NotFound();
        }

        [HttpPost(Name = "AddProduct")]
        public async Task<ActionResult<VenueReadDto>> AddProduct(ProductCreateDto productCreateDto)
        {
            var venueExists = await _venueRepo.Exists(productCreateDto.VenueId);
            if (!venueExists)
            {
                return NotFound("Venue Doesn't exists");
            }

            var product = _mapper.Map<Product>(productCreateDto);

            await _productRepo.Create(product);

            var roductReadDto = _mapper.Map<ProductReadDto>(product);

            return CreatedAtRoute(nameof(GetProductById),
                new { id = roductReadDto.Id }, roductReadDto);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var productModel = await _productRepo.GetById(id);
            if (productModel == null)
            {
                return NotFound();
            }
            await _productRepo.Delete(productModel);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, ProductUpdateDto productUpdateDto)
        {
            var productModel = await _productRepo.GetById(id);
            if (productModel == null)
            {
                return NotFound();
            }
            _mapper.Map(productUpdateDto, productModel);

            return NoContent();
        }
    }
}
