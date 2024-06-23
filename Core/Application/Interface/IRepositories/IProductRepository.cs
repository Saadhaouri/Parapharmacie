using Domaine.Entities;

namespace Core.Application.Interface.IRepositories;


    public interface IProductRepository
    {
        List<Product> GetProductsByIds(List<Guid> productIds);
        IEnumerable<Product> GetProducts();
        Product GetProductById(Guid productId);
        void InsertProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(Guid productId);
        void Save();

        // Additional methods for sales, purchases, and stock management

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

        // Transaction History Method
  

        // Stock Alert Method
        IEnumerable<Product> GetStockAlerts();
    }

