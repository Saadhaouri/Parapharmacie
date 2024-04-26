using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Domaine.Entities;

namespace BetyParaAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {

            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<ProductDto, ProductViewModel>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<OrderDto, OrderViewModel>().ReverseMap();
            CreateMap<Promotion, PromotionDto>().ReverseMap();
            CreateMap<PromotionDto, PromotionViewModel>().ReverseMap();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<AddressDto, AddressViewModel>().ReverseMap();
            CreateMap<Client, ClientDto>().ReverseMap(); 
            CreateMap<ClientDto, ClientViewModel>().ReverseMap(); 


        }
    }
}
