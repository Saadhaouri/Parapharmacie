using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Core.Application.Interface.IService;
using Domaine.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public List<Product> GetProductsForDebt(List<Guid> productIds)
        {
            return _productRepository.GetProductsByIds(productIds);
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

        public async Task UpdateProduct(Guid productId, ProductDto productDto)
        {
            var product = _productRepository.GetProductById(productId);
            if (product == null)
            {
                throw new InvalidOperationException($"product with ID {productId} not found");
            }

            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.Price = productDto.Price;
            product.CategoryID = productDto.CategoryID;
            product.Quantity = productDto.Quantity;
            product.DateExp = productDto.DateExp;

            // Map updated values to the existing entity
            //await _productRepository.UpdateProduct(category);
            _productRepository.Save();
        }

        public void DeleteProduct(Guid productId)
        {
            _productRepository.DeleteProduct(productId);
            _productRepository.Save();
        }

        public void SellProduct(Guid productId, int quantity)
        {
            _productRepository.SellProduct(productId, quantity);
        }

        public void PurchaseProduct(Guid productId, int quantity)
        {
            _productRepository.PurchaseProduct(productId, quantity);
        }

        public int CheckStock(Guid productId)
        {
            return _productRepository.CheckStock(productId);
        }

        public bool CheckAvailability(Guid productId, int desiredQuantity)
        {
            return _productRepository.CheckAvailability(productId, desiredQuantity);
        }

        public void UpdateStock(Guid productId, int newStockQuantity)
        {
            _productRepository.UpdateStock(productId, newStockQuantity);
        }

        public void AutoReorder(int thresholdQuantity)
        {
            _productRepository.AutoReorder(thresholdQuantity);
        }

        public IEnumerable<ProductDto> GetStockAlerts()
        {
            var products = _productRepository.GetStockAlerts();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }

        public IEnumerable<ProductDto> GetProductsExpiringWithinAMonth()
        {
            var currentDate = DateTime.Now;
            var oneMonthLater = currentDate.AddMonths(1);

            var products = _productRepository.GetProducts()
                .Where(p => p.DateExp <= oneMonthLater && p.DateExp > currentDate);

            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
    }
}
