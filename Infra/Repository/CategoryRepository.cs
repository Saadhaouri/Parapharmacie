using Domaine.Entities;
using Infra.Database;
using Core.Application.Interface.IRepositories;


namespace Para.Infrastructure.Repository;
public class CategoryRepository : ICategoryRepository
{
    private readonly ParaDbContext _dbContext; 

    public CategoryRepository(ParaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<Category> GetCategories()
    {
        return _dbContext.Categories.ToList();
    }

    public Category GetCategoryById(Guid categoryId)
    {
        return _dbContext.Categories.FirstOrDefault(c => c.ID == categoryId) ?? throw new InvalidOperationException(" Category Not found ");
    }

    public void InsertCategory(Category category)
    {
        _dbContext.Categories.Add(category);
    }

    public void UpdateCategory(Category category)
    {
        _dbContext.Categories.Update(category);
    }

    public void DeleteCategory(Guid categoryId)
    {
        var category = _dbContext.Categories.FirstOrDefault(c => c.ID == categoryId);
        if (category != null)
        {
            _dbContext.Categories.Remove(category);
        }
    }

    public void Save()
    {
        _dbContext.SaveChanges();
    }
}
