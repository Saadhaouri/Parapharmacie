namespace BetyParaAPI.ViewModel;

public class PromotionViewModel
{
    public Guid PromotionID { get; set; }
    public string Code { get; set; }
    public decimal Discount { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public List<Guid> ProductIds { get; set; }

}
