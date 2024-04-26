using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;

namespace Core.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public IEnumerable<ProductDto> GetProducts()
        {
            var products = _productRepository.GetProducts();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }

        public ProductDto GetProductById(Guid productId)
        {
            var product = _productRepository.GetProductById(productId);
            return _mapper.Map<ProductDto>(product);
        }

        public void AddProduct(ProductDto product)
        {
            var productModel = _mapper.Map<Product>(product);
            _productRepository.InsertProduct(productModel);
            _productRepository.Save();
        }

        public void UpdateProduct(ProductDto product)
        {
            var productModel = _mapper.Map<Product>(product);
            _productRepository.UpdateProduct(productModel);
            _productRepository.Save();
        }

        public void DeleteProduct(Guid productId)
        {
            _productRepository.DeleteProduct(productId);
            _productRepository.Save();
        }
    }

}
