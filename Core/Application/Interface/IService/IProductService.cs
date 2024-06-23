using Core.Application.Dto_s;
using Domaine.Entities;

namespace Core.Application.Interface.IService;

public interface IProductService
{
    List<Product> GetProductsForDebt(List<Guid> productIds);
    IEnumerable<ProductDto> GetProducts();
    ProductDto GetProductById(Guid productId);
    void AddProduct(ProductDto product);
    Task UpdateProduct(Guid productId, ProductDto product);
    void DeleteProduct(Guid productId);
    // Sale Method
    void SellProduct(Guid productId, int quantity);
    // Purchase Method
    void PurchaseProduct(Guid productId, int quantity);
    // Check Stock Method
    int CheckStock(Guid productId);
    // Check Availability Method
    bool CheckAvailability(Guid productId, int desiredQuantity);
    // Update Stock Method
    void UpdateStock(Guid productId, int newStockQuantity);
    // Auto-Reorder Method
    void AutoReorder(int thresholdQuantity);
    // Stock Alert Method
    IEnumerable<ProductDto> GetStockAlerts();
    // Method to get products expiring within a month
    IEnumerable<ProductDto> GetProductsExpiringWithinAMonth();
}
