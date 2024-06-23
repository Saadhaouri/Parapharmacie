using AutoMapper;
using BetyParaAPI.ViewModel;
using Core.Application.Dto_s;
using Microsoft.AspNetCore.Mvc;

namespace BetyParaAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly IMapper _mapper;

    public CategoryController(ICategoryService categoryService, IMapper mapper)
    {
        _categoryService = categoryService;
        _mapper = mapper;
    }

    // GET: api/Category
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categoriesDto = await _categoryService.GetCategoriesAsync();
        var categoriesViewModel = _mapper.Map<IEnumerable<CategoryViewModel>>(categoriesDto);
        return Ok(categoriesViewModel);
    }

    // GET: api/Category/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategory(Guid id)
    {
        var categoryDto = await _categoryService.GetCategoryByIdAsync(id);
        if (categoryDto == null)
        {
            return NotFound($"Category with ID {id} not found");
        }

        var categoryViewModel = _mapper.Map<CategoryViewModel>(categoryDto);
        return Ok(categoryViewModel);
    }

    // POST: api/Category
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoriesViewModel categoryCreateViewModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var categoryDto = _mapper.Map<CategoryDto>(categoryCreateViewModel);
        await _categoryService.AddCategoryAsync(categoryDto);

        var categoryViewModel = _mapper.Map<CategoryViewModel>(categoryDto);
        return CreatedAtAction(nameof(GetCategory), new { id = categoryViewModel.Id }, categoryViewModel);
    }

    // PUT: api/Category/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] CreateCategoriesViewModel categoryUpdateViewModel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var categoryDto = _mapper.Map<CategoryDto>(categoryUpdateViewModel);
            await _categoryService.UpdateCategoryAsync(id, categoryDto);
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(ex.Message);
        }

        return Ok("Category updated successfully");
    }

    // DELETE: api/Category/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        await _categoryService.DeleteCategoryAsync(id);
        return NoContent();
    }

    // GET: api/Category/{id}/products
    [HttpGet("{id}/products")]
    public async Task<IActionResult> GetProductsByCategoryId(Guid id)
    {
        var productsDto = await _categoryService.GetProductsByCategoryIdAsync(id);
        if (productsDto == null || !productsDto.Any())
        {
            return NotFound($"No products found for category with ID {id}");
        }

        var productsViewModel = _mapper.Map<IEnumerable<CategoryProductsViewModel>>(productsDto);
        return Ok(productsViewModel);
    }
}
