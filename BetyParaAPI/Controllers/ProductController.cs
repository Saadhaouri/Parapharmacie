namespace BetyParaAPI.Controllers;

    using AutoMapper;
    using Core.Application.Dto_s;
    using Core.Application.Interface.IService;
    using Microsoft.AspNetCore.Mvc;
    using ViewModel;

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
            var productDtos = _productService.GetProducts();
            var productViewModels = _mapper.Map<IEnumerable<ProductViewModel>>(productDtos);
            return Ok(productViewModels);
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
        public IActionResult AddProduct([FromBody] ProductViewModel productViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var productDto = _mapper.Map<ProductDto>(productViewModel);
            _productService.AddProduct(productDto);
        return Ok("Product added successfully");
    }

        [HttpPut("{productId}")]
        public IActionResult UpdateProduct(Guid productId, [FromBody] ProductViewModel productViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var existingProductDto = _productService.GetProductById(productId);
            if (existingProductDto == null)
            {
                return NotFound();
            }
            _mapper.Map(productViewModel, existingProductDto);
            _productService.UpdateProduct(existingProductDto);
            return NoContent();
        }

        [HttpDelete("{productId}")]
        public IActionResult DeleteProduct(Guid productId)
        {
            var existingProductDto = _productService.GetProductById(productId);
            if (existingProductDto == null)
            {
                return NotFound();
            }
            _productService.DeleteProduct(productId);
            return NoContent();
        }
    }


