using Domaine.Entities;
using Infra.Database;
using Core.Application.Interface.IRepositories;

public class ProductRepository : IProductRepository
{
    private readonly ParaDbContext _dbContext; 

    public ProductRepository(ParaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public IEnumerable<Product> GetProducts()
    {
        return _dbContext.Products.ToList();
    }

    public Product GetProductById(Guid productId)
    {
        return _dbContext.Products.FirstOrDefault(p => p.ProductID == productId) 
            ?? throw new InvalidOperationException(" Product not found ");
    }

    public void InsertProduct(Product product)
    {
        _dbContext.Products.Add(product);
    }

    public void UpdateProduct(Product product)
    {
        _dbContext.Products.Update(product);
    }

    public void DeleteProduct(Guid productId)
    {
        var product = _dbContext.Products.FirstOrDefault(p => p.ProductID == productId);
        if (product != null)
        {
            _dbContext.Products.Remove(product);
        }
    }

    public void Save()
    {
        _dbContext.SaveChanges();
    }
}
