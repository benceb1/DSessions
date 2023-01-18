using AutoMapper;
using DrinkSessionsApp.Dtos;
using DrinkSessionsApp.Models;

namespace DrinkSessionsApp.Profiles
{
    public class MyProfiles : Profile
    {
        public MyProfiles()
        {
            // source -> target
            //venues
            CreateMap<Venue, VenueReadDto>();
            CreateMap<VenueCreateDto, Venue>();

            //products
            CreateMap<Product, ProductReadDto>();
            CreateMap<ProductCreateDto, Product>();
            CreateMap<ProductUpdateDto, Product>();

            //users
            CreateMap<User, UserReadDto>();
            CreateMap<User, UserLoginSuccessDto>();
            CreateMap<UserLoginDto, User>();
            CreateMap<UserCreateDto, User>();

        }
    }
}
