namespace Core.Application.Dto_s;

public class SaleDto
{
    
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }

    public decimal Profit { get; set; }

    public DateTime SaleDate { get; set; }
}
