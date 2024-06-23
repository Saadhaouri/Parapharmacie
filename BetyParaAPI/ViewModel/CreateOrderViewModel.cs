namespace BetyParaAPI.ViewModel;

public class CreateOrderViewModel
{
    public Guid SupplierId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public string Status { get; set; }
    public Guid ClientId { get; set; }
    public List<Guid> ProductIds { get; set; }
}