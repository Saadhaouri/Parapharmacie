
using Domaine.Entities;

namespace Core.Application.Dto_s;

public class ProductDto
{
    public Guid ProductID { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public decimal PriceForSale { get; set; } // New property for sale price

    public int Quantity { get; set; }
    public Guid CategoryID { get; set; }
    public DateTime DateExp { get; set; }
    public bool IsAvaible { get; set; } = true;
}
