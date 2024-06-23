
using Core.Application.Dto_s;

public class OrderDto
{
    public Guid OrderID { get; set; }
    public Guid SupplierId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }
    public Guid ClientId { get; set; }
    public List<Guid> ProductIds { get; set; }
}
