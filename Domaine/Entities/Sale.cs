namespace Domaine.Entities;

public class Sale
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; }
    public decimal Profit { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public DateTime SaleDate { get; set; }

}
