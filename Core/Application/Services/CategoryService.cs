using AutoMapper;
using Core.Application.Dto_s;
using Core.Application.Interface.IRepositories;
using Domaine.Entities;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IMapper _mapper;

    public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
    {
        _categoryRepository = categoryRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
    {
        var categories = await _categoryRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<CategoryDto>>(categories);
    }

    public async Task<CategoryDto> GetCategoryByIdAsync(Guid categoryId)
    {
        var category = await _categoryRepository.GetByIdAsync(categoryId);
        return _mapper.Map<CategoryDto>(category);
    }

    public async Task AddCategoryAsync(CategoryDto categoryDto)
    {
        var category = _mapper.Map<Category>(categoryDto);
        await _categoryRepository.InsertAsync(category);
        await _categoryRepository.SaveAsync();
    }

    public async Task UpdateCategoryAsync(Guid categoryId, CategoryDto categoryDto)
    {
        var category = await _categoryRepository.GetByIdAsync(categoryId);
        if (category == null)
        {
            throw new InvalidOperationException($"Category with ID {categoryId} not found");
        }

        category.Name = categoryDto.Name;

        // Map updated values to the existing entity
        await _categoryRepository.UpdateAsync(category);
        await _categoryRepository.SaveAsync();
    }

    public async Task DeleteCategoryAsync(Guid categoryId)
    {
        await _categoryRepository.DeleteAsync(categoryId);
        await _categoryRepository.SaveAsync();
    }

    public async Task<IEnumerable<ProductDto>> GetProductsByCategoryIdAsync(Guid categoryId)
    {
        var products = await _categoryRepository.GetProductsByCategoryIdAsync(categoryId);
        return _mapper.Map<IEnumerable<ProductDto>>(products);
    }
}
