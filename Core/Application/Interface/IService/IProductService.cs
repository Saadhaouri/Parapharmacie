using Core.Application.Dto_s;

namespace Core.Application.Interface.IService
;

public interface IProductService
{
    IEnumerable<ProductDto> GetProducts();
    ProductDto GetProductById(Guid productId);
    void AddProduct(ProductDto product);
    void UpdateProduct(ProductDto product);
    void DeleteProduct(Guid productId);
}