namespace Domaine.Entities;

public class Order
{
    public Guid OrderID { get; set; }
    public Guid SupplierId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }
    public Guid ClientId { get; set; }
    public Client Client { get; set; }
    public Supplier Supplier { get; set; }
    public List<OrderProduct> OrderProducts { get; set; }
}
