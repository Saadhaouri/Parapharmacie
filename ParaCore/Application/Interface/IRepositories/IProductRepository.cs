using Domaine.Entities;

namespace Para.Core.Application.Interface.IRepositories;

public interface IProductRepository
{
    IEnumerable<Product> GetProducts();
    Product GetProductById(Guid productId);
    void InsertProduct(Product product);
    void UpdateProduct(Product product);
    void DeleteProduct(Guid productId);
    void Save();
}

