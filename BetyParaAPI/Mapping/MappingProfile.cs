using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Domaine.Entities;
using System.Linq;

namespace BetyParaAPI.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Product mappings
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<ProductDto, ProductViewModel>().ReverseMap();
            CreateMap<ProductDto, CategoryProductsViewModel>().ReverseMap();

            // Order mappings
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.ProductIds, opt => opt.MapFrom(src => src.OrderProducts.Select(op => op.ProductId).ToList()))
                .ReverseMap()
                .ForMember(dest => dest.OrderProducts, opt => opt.Ignore()); // Ignoring OrderProducts here, handle it separately if needed

            CreateMap<OrderDto, OrderViewModel>().ReverseMap();
            CreateMap<CreateOrderDto, CreateOrderViewModel>().ReverseMap();


            // Promotion mappings
            CreateMap<Promotion, PromotionDto>()
                .ForMember(dest => dest.ProductIds, opt => opt.MapFrom(src => src.ProductPromotions.Select(pp => pp.ProductId).ToList()))
                .ReverseMap()
                .ForMember(dest => dest.ProductPromotions, opt => opt.Ignore()); // Ignoring ProductPromotions here, handle it separately if needed

            CreateMap<PromotionDto, PromotionViewModel>().ReverseMap();
            CreateMap<CreatePromotionDto, CreatePromotionViewModel>().ReverseMap();
            CreateMap<CreatePromotionDto, Promotion>().ReverseMap();
            // Address mappings
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<AddressDto, AddressViewModel>().ReverseMap();

            // Client mappings
            CreateMap<Client, ClientDto>().ReverseMap();
            CreateMap<ClientDto, ClientViewModel>().ReverseMap();
            CreateMap<ClientDto, CreateClientViewModel>().ReverseMap();

            // AddressClient mappings
            CreateMap<AddressClient, AddressClientDto>().ReverseMap();
            CreateMap<AddressClientDto, AddressClientViewModel>().ReverseMap();

            // Category mappings
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CategoryDto, CategoryViewModel>().ReverseMap();
            CreateMap<CategoryDto, CreateCategoriesViewModel>().ReverseMap();

            // User mappings
            CreateMap<SignUpUser, SignUpUserDto>().ReverseMap();
            CreateMap<SignInUser, SignInUserDto>().ReverseMap();
            CreateMap<SignUpUserDto, RegisterViewModel>().ReverseMap();
            CreateMap<SignUpUserDto, SignInViewModel>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserDto, UserViewModel>().ReverseMap();

            // Supplier mappings
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<SupplierDto, SupplierViewModel>().ReverseMap();
            CreateMap<SupplierDto, ACsupplierViewModel>().ReverseMap();

            // AddProduct mappings
            CreateMap<AddProductViewModel, ProductDto>().ReverseMap();

            // Sale mappings
            CreateMap<SaleDto, Sale>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.SaleDate, opt => opt.Ignore());
            CreateMap<Sale, SaleDto>();

            CreateMap<SaleDto, SaleViewModel>().ReverseMap();
            CreateMap<SaleDto, AddSaleViewModel>().ReverseMap();
        }
    }
}
