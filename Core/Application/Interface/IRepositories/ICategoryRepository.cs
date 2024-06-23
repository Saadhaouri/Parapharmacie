using Domaine.Entities;

namespace Core.Application.Interface.IRepositories
{
    public interface ICategoryRepository
    {

        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category> GetByIdAsync(Guid categoryId);
        Task InsertAsync(Category category);
        Task DeleteAsync(Guid categoryId);
        Task UpdateAsync(Category category);
        Task SaveAsync();

        // New method to get products by category ID
        Task<IEnumerable<Product>> GetProductsByCategoryIdAsync(Guid categoryId);
    }
}
