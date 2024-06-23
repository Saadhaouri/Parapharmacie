using Core.Application.Dto_s;

public interface ICategoryService
{
    Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
    Task<CategoryDto> GetCategoryByIdAsync(Guid categoryId);
    Task AddCategoryAsync(CategoryDto category);
    Task DeleteCategoryAsync(Guid categoryId);
    Task UpdateCategoryAsync(Guid categoryId, CategoryDto category);
    // New method to get products by category ID
    Task<IEnumerable<ProductDto>> GetProductsByCategoryIdAsync(Guid categoryId);
}
