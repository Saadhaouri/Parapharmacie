using Domaine.Entities;

namespace Para.Core.Application.Interface.IRepositories;

    public interface ICategoryRepository
    {
        IEnumerable<Category> GetCategories();
        Category GetCategoryById(Guid categoryId);
        void InsertCategory(Category category);
        void UpdateCategory(Category category);
        void DeleteCategory(Guid categoryId);
        void Save();
    }

