using Core.Application.Interface.IRepositories;
using Domaine.Entities;
using Infra.DATA;
using System.Data.Entity;

public class ProductRepository : IProductRepository
{
    private readonly PrDbContext _dbContext;

    public ProductRepository(PrDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<Product> GetProductsByIds(List<Guid> productIds)
    {
        return _dbContext.Products
            .Where(product => productIds.Contains(product.ProductID))
            .ToList();
    }

    public IEnumerable<Product> GetProducts()
    {
        return _dbContext.Products.Include(product => product.Category).ToList();
    }

    public Product GetProductById(Guid productId)
    {
        return _dbContext.Products.FirstOrDefault(p => p.ProductID == productId)
            ?? throw new InvalidOperationException("Product not found");
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

    // Additional methods for sales, purchases, and stock management

    public void SellProduct(Guid productId, int quantity)
    {
        var product = GetProductById(productId);
        if (product.Quantity < quantity)
        {
            throw new InvalidOperationException("Insufficient stock");
        }
        product.Quantity -= quantity;
        UpdateProduct(product);
        Save();
    }

    public void PurchaseProduct(Guid productId, int quantity)
    {
        var product = GetProductById(productId);
        product.Quantity += quantity;
        UpdateProduct(product);
        Save();
    }

    public int CheckStock(Guid productId)
    {
        var product = GetProductById(productId);
        return product.Quantity;
    }

    public bool CheckAvailability(Guid productId, int desiredQuantity)
    {
        var product = GetProductById(productId);
        return product.Quantity >= desiredQuantity;
    }

    public void UpdateStock(Guid productId, int newStockQuantity)
    {
        var product = GetProductById(productId);
        product.Quantity = newStockQuantity;
        UpdateProduct(product);
        Save();
    }

    public void AutoReorder(int thresholdQuantity)
    {
        var productsBelowThreshold = _dbContext.Products.Where(p => p.Quantity < thresholdQuantity);
        foreach (var product in productsBelowThreshold)
        {
            PurchaseProduct(product.ProductID, thresholdQuantity - product.Quantity);
        }
    }

    public IEnumerable<Product> GetStockAlerts()
    {
        // Example: Get products with quantity less than 10 as stock alerts
        return _dbContext.Products.Where(p => p.Quantity < 10).ToList();
    }
}
