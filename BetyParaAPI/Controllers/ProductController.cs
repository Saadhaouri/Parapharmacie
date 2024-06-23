using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Core.Application.Interface.IService;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BetyParaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService productService, IMapper mapper)
        {
            _productService = productService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var productsDto = _productService.GetProducts();
            var productsViewModel = _mapper.Map<IEnumerable<ProductViewModel>>(productsDto);
            return Ok(productsViewModel);
        }

        [HttpGet("{productId}")]
        public IActionResult GetProductById(Guid productId)
        {
            var productDto = _productService.GetProductById(productId);
            if (productDto == null)
            {
                return NotFound();
            }
            var productViewModel = _mapper.Map<ProductViewModel>(productDto);
            return Ok(productViewModel);
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] AddProductViewModel productViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productDto = _mapper.Map<ProductDto>(productViewModel);
            _productService.AddProduct(productDto);
            return Ok("Product added successfully");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] AddProductViewModel productViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var productDto = _mapper.Map<ProductDto>(productViewModel);
                await _productService.UpdateProduct(id, productDto);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }

            return Ok("Product updated successfully");
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(Guid id)
        {
            try
            {
                _productService.DeleteProduct(id);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }

            return Ok("Product deleted successfully");
        }

       

      
        [HttpGet("{productId}/stock")]
        public IActionResult CheckStock(Guid productId)
        {
            var stock = _productService.CheckStock(productId);
            return Ok(stock);
        }

        [HttpGet("{productId}/availability")]
        public IActionResult CheckAvailability(Guid productId, [FromQuery] int desiredQuantity)
        {
            var isAvailable = _productService.CheckAvailability(productId, desiredQuantity);
            return Ok(isAvailable);
        }

       


        [HttpGet("stock-alerts")]
        public IActionResult GetStockAlerts()
        {
            var productsDto = _productService.GetStockAlerts();
            var productsViewModel = _mapper.Map<IEnumerable<ProductViewModel>>(productsDto);
            return Ok(productsViewModel);
        }

        [HttpGet("expiring-soon")]
        public IActionResult GetProductsExpiringWithinAMonth()
        {
            var productsDto = _productService.GetProductsExpiringWithinAMonth();
            var productsViewModel = _mapper.Map<IEnumerable<ProductViewModel>>(productsDto);
            return Ok(productsViewModel);
        }
    }

    public class QuantityDto
    {
        public int Quantity { get; set; }
    }
}
